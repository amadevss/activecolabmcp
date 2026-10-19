import { cloudLogin, cloudLoginTwoFactor, issueAccountToken, type CloudAccount, type CloudLoginResult } from "@/lib/activecollab/client";
import { open, randomId, safeEqual, seal } from "@/lib/auth/crypto";
import { readParams } from "@/lib/auth/http";
import { checkAccountAccess } from "@/lib/auth/access";
import {
  AUTH_REQUEST_TTL,
  type AuthRequest,
  issueCode,
  PENDING_TTL,
  type PendingLogin,
  publicOrigin,
  readClient,
  resourceUrl,
  SCOPE,
} from "@/lib/auth/oauth";
import { chooseAccountPage, errorPage, htmlResponse, loginPage, twoFactorPage } from "@/lib/auth/pages";
import { clientIp, hashKey, rateLimitAll, waitMessage } from "@/lib/rate-limit";

const isHttps = (origin: string) => origin.startsWith("https://");
const cookieName = (origin: string) => (isHttps(origin) ? "__Host-acmcp_auth" : "acmcp_auth");

function nonceCookie(origin: string, value: string, maxAge: number) {
  return `${cookieName(origin)}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${isHttps(origin) ? "; Secure" : ""}`;
}

function readCookie(req: Request, name: string) {
  const header = req.headers.get("cookie") || "";
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return undefined;
}

/** Vuelve a Claude con un resultado (código o error). */
function redirectBack(origin: string, redirectUri: string, params: Record<string, string | undefined>) {
  const url = new URL(redirectUri);
  for (const [k, v] of Object.entries(params)) if (v !== undefined) url.searchParams.set(k, v);
  url.searchParams.set("iss", origin);
  const headers = new Headers({ Location: url.toString(), "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" });
  headers.append("Set-Cookie", nonceCookie(origin, "", 0));
  return new Response(null, { status: 303, headers });
}

// ---------- GET: Claude abre esta URL en el navegador ----------

export async function GET(req: Request) {
  const origin = publicOrigin(req);
  const p = new URL(req.url).searchParams;
  const clientId = p.get("client_id") || "";
  const client = readClient(clientId);
  if (!client) return errorPage("Cliente no válido", "Vuelve a agregar el conector desde Claude.");

  let redirectUri = p.get("redirect_uri");
  if (!redirectUri && client.ru.length === 1) redirectUri = client.ru[0];
  if (!redirectUri || !client.ru.includes(redirectUri)) {
    return errorPage("Dirección de retorno no válida", "La redirect_uri no coincide con la registrada por el cliente.");
  }

  const state = p.get("state") || undefined;
  const fail = (error: string, description: string) =>
    redirectBack(origin, redirectUri!, { error, error_description: description, state });

  if (p.get("response_type") !== "code") return fail("unsupported_response_type", "Solo se admite response_type=code.");
  const challenge = p.get("code_challenge") || "";
  if (p.get("code_challenge_method") !== "S256" || !/^[A-Za-z0-9_-]{43}$/.test(challenge)) {
    return fail("invalid_request", "PKCE con S256 es obligatorio.");
  }
  const resource = p.get("resource");
  if (resource && resource.replace(/\/+$/, "") !== resourceUrl(origin) && resource.replace(/\/+$/, "") !== origin) {
    return fail("invalid_target", "El recurso solicitado no pertenece a este servidor.");
  }
  if (state && state.length > 1024) return fail("invalid_request", "state demasiado largo.");

  const nonce = randomId();
  const authReq: AuthRequest = { cid: clientId, ru: redirectUri, cc: challenge, st: state, sc: SCOPE, nonce };
  const reqToken = seal("authreq", authReq, AUTH_REQUEST_TTL);

  return htmlResponse(
    loginPage({ reqToken, clientName: client.n, redirectHost: new URL(redirectUri).host }),
    { formActions: [new URL(redirectUri).origin], setCookie: [nonceCookie(origin, nonce, AUTH_REQUEST_TTL)] },
  );
}

// ---------- POST: formularios de la página de login ----------

export async function POST(req: Request) {
  const origin = publicOrigin(req);

  // Defensa CSRF adicional: el formulario solo puede venir de nuestra propia página.
  const reqOrigin = req.headers.get("origin");
  if (reqOrigin && reqOrigin !== "null" && reqOrigin !== origin) {
    return errorPage("Solicitud no permitida", "El formulario no proviene de este servidor.", 403);
  }

  const form = await readParams(req);
  const reqToken = form.req || "";
  const authReq = open<AuthRequest>("authreq", reqToken);
  if (!authReq) return errorPage("La sesión caducó", "Vuelve a conectar el conector desde Claude para empezar de nuevo.");

  const cookieNonce = readCookie(req, cookieName(origin));
  if (!cookieNonce || !safeEqual(cookieNonce, authReq.nonce)) {
    return errorPage("La sesión no es válida", "Abre de nuevo la conexión desde Claude en este mismo navegador.", 403);
  }
  const client = readClient(authReq.cid);
  if (!client || !client.ru.includes(authReq.ru)) return errorPage("Cliente no válido", "Vuelve a agregar el conector desde Claude.");

  const redirectOrigin = new URL(authReq.ru).origin;
  const page = (html: string) => htmlResponse(html, { formActions: [redirectOrigin] });
  const login = (error?: string, email?: string) =>
    page(loginPage({ reqToken, clientName: client.n, redirectHost: new URL(authReq.ru).host, email, error }));

  const finish = async (account: CloudAccount, email: string) => {
    const acToken = await issueAccountToken(account.id, account.intent);
    const code = issueCode({ cid: authReq.cid, acct: account.id, act: acToken, em: email, sc: authReq.sc }, authReq);
    return redirectBack(origin, authReq.ru, { code, state: authReq.st });
  };

  const afterLogin = async (result: CloudLoginResult, email: string, pendingForRetry?: string) => {
    if (result.status === "error") {
      return pendingForRetry
        ? page(twoFactorPage({ reqToken, pendingToken: pendingForRetry, error: "Código incorrecto o caducado." }))
        : login(`No se pudo iniciar sesión: ${result.message}`, email);
    }
    if (result.status === "two_factor") {
      const pending: PendingLogin = { kind: "two_factor", intentId: result.intentId, email };
      return page(twoFactorPage({ reqToken, pendingToken: seal("pending", { ...pending, nonce: authReq.nonce }, PENDING_TTL) }));
    }
    const decisions = await Promise.all(result.accounts.map((a) => checkAccountAccess(a.id)));
    const accounts = result.accounts.filter((_, i) => decisions[i].allowed);
    if (!accounts.length) {
      const reason = decisions.find((d) => !d.allowed);
      return errorPage(
        "Sin acceso",
        reason && !reason.allowed
          ? reason.reason
          : "Tu usuario no tiene ninguna cuenta de ActiveCollab disponible.",
        403,
      );
    }
    if (accounts.length === 1) return finish(accounts[0], email);
    const pending: PendingLogin = { kind: "choose_account", email, accounts };
    return page(
      chooseAccountPage({
        reqToken,
        pendingToken: seal("pending", { ...pending, nonce: authReq.nonce }, PENDING_TTL),
        accounts: accounts.map(({ id, name }) => ({ id, name })),
      }),
    );
  };

  const readPending = () => {
    const pending = open<PendingLogin & { nonce: string }>("pending", form.pending);
    return pending && safeEqual(pending.nonce, authReq.nonce) ? pending : null;
  };

  try {
    switch (form.step) {
      case "cancel":
        return redirectBack(origin, authReq.ru, { error: "access_denied", error_description: "El usuario canceló.", state: authReq.st });

      case "login": {
        const email = (form.email || "").trim().slice(0, 254);
        const password = (form.password || "").slice(0, 512);
        if (!email || !password) return login("Escribe tu email y tu contraseña.", email);
        const limited = await rateLimitAll([
          ["loginIp", clientIp(req)],
          ["loginEmail", hashKey(email)],
        ]);
        if (!limited.ok) return login(waitMessage(limited.retryAfterSeconds), email);
        return await afterLogin(await cloudLogin(email, password), email);
      }

      case "two_factor": {
        const pending = readPending();
        if (!pending || pending.kind !== "two_factor") return login("La verificación caducó. Inicia sesión de nuevo.");
        const code = (form.code || "").replace(/\s+/g, "").slice(0, 32);
        if (!code) return page(twoFactorPage({ reqToken, pendingToken: form.pending, error: "Escribe el código." }));
        const limited = await rateLimitAll([["twoFactorIp", clientIp(req)]]);
        if (!limited.ok) {
          return page(twoFactorPage({ reqToken, pendingToken: form.pending, error: waitMessage(limited.retryAfterSeconds) }));
        }
        return await afterLogin(await cloudLoginTwoFactor(pending.intentId, code), pending.email, form.pending);
      }

      case "account": {
        const pending = readPending();
        if (!pending || pending.kind !== "choose_account") return login("La selección caducó. Inicia sesión de nuevo.");
        const account = pending.accounts.find((a) => a.id === form.account);
        if (!account) return login("Cuenta no válida.");
        const decision = await checkAccountAccess(account.id);
        if (!decision.allowed) return errorPage("Sin acceso", decision.reason, 403);
        return await finish(account, pending.email);
      }

      default:
        return login();
    }
  } catch {
    // No se registra el error para no arriesgar que aparezcan datos sensibles en los logs.
    return login("No se pudo conectar con ActiveCollab. Inténtalo de nuevo en unos minutos.", form.email);
  }
}
