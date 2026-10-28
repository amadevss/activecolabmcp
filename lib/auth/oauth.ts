import { clientSecretFor, open, safeEqual, seal, sha256base64url } from "./crypto";

// ---------- configuración ----------

export const SCOPE = "activecollab";
export const ACCESS_TOKEN_TTL = 60 * 60; // 1 hora
export const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60; // 30 días
export const CODE_TTL = 60; // 1 minuto
export const AUTH_REQUEST_TTL = 10 * 60; // 10 minutos para completar el login
export const PENDING_TTL = 5 * 60; // 5 minutos para el código 2FA / elegir cuenta

/**
 * Normaliza PUBLIC_URL: acepta "mi-app.vercel.app", "https://mi-app.vercel.app/" o incluso la URL
 * completa del MCP ("…/api/mcp"), y devuelve solo el origen ("https://mi-app.vercel.app").
 * Devuelve null si no está definida o no es válida.
 */
export function configuredPublicOrigin(): string | null {
  const raw = process.env.PUBLIC_URL?.trim();
  if (!raw) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    return url.origin;
  } catch {
    return null;
  }
}

/** Origen público del servidor. Fijarlo con PUBLIC_URL evita depender de la cabecera Host. */
export function publicOrigin(req: Request): string {
  return configuredPublicOrigin() ?? new URL(req.url).origin;
}

export const resourceUrl = (origin: string) => `${origin}/api/mcp`;

/** Hosts a los que se permite volver después del login (solo clientes de Claude por defecto). */
function allowedRedirectHosts(): string[] {
  const extra = (process.env.OAUTH_ALLOWED_REDIRECT_HOSTS || "")
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  return ["claude.ai", "claude.com", ...extra];
}

export function isAllowedRedirectUri(uri: string): boolean {
  let u: URL;
  try {
    u = new URL(uri);
  } catch {
    return false;
  }
  if (u.hash || u.username || u.password) return false;
  // Apps locales (Claude Code, Claude Desktop): solo loopback por http.
  if (u.protocol === "http:") return ["localhost", "127.0.0.1", "[::1]"].includes(u.hostname);
  if (u.protocol !== "https:") return false;
  const host = u.hostname.toLowerCase();
  return allowedRedirectHosts().some((h) => host === h || host.endsWith("." + h));
}

// ---------- clientes (registro dinámico, sin base de datos) ----------

export type AuthMethod = "none" | "client_secret_post" | "client_secret_basic";

export type ClientInfo = {
  ru: string[]; // redirect_uris
  n: string; // client_name
  am: AuthMethod;
  iat: number;
};

export function registerClient(input: { redirect_uris: string[]; client_name: string; auth_method: AuthMethod }) {
  const iat = Math.floor(Date.now() / 1000);
  const clientId = seal("client", { ru: input.redirect_uris, n: input.client_name, am: input.auth_method, iat });
  return {
    client_id: clientId,
    client_secret: input.auth_method === "none" ? undefined : clientSecretFor(clientId),
    iat,
  };
}

export function readClient(clientId: string | null | undefined): ClientInfo | null {
  return open<ClientInfo>("client", clientId);
}

/** Verifica la autenticación del cliente en /oauth/token según cómo se registró. */
export function authenticateClient(client: ClientInfo, clientId: string, providedSecret: string | undefined): boolean {
  if (client.am === "none") return true;
  return !!providedSecret && safeEqual(providedSecret, clientSecretFor(clientId));
}

// ---------- solicitud de autorización (viaja en el formulario de login) ----------

export type AuthRequest = {
  cid: string; // client_id
  ru: string; // redirect_uri
  cc: string; // code_challenge (S256)
  st?: string; // state
  sc: string; // scope
  nonce: string; // ligado a la cookie del navegador
};

export type PendingLogin =
  | { kind: "two_factor"; intentId: string; email: string }
  | { kind: "choose_account"; email: string; accounts: { id: string; name: string; intent: string }[] };

// ---------- códigos y tokens ----------

export type Grant = {
  cid: string; // client_id
  acct: string; // ID de la cuenta de ActiveCollab
  act: string; // token de ActiveCollab
  em: string; // email del usuario
  sc: string; // scope
};

export function issueCode(grant: Grant, req: AuthRequest) {
  return seal("code", { ...grant, ru: req.ru, cc: req.cc }, CODE_TTL);
}

export function redeemCode(code: string, clientId: string, redirectUri: string | null, verifier: string | null) {
  const data = open<Grant & { ru: string; cc: string }>("code", code);
  if (!data || !verifier) return null;
  if (!safeEqual(data.cid, clientId)) return null;
  if (redirectUri !== null && redirectUri !== data.ru) return null;
  if (!/^[A-Za-z0-9\-._~]{43,128}$/.test(verifier)) return null;
  if (!safeEqual(sha256base64url(verifier), data.cc)) return null;
  return { cid: data.cid, acct: data.acct, act: data.act, em: data.em, sc: data.sc };
}

export function issueTokens(grant: Grant, origin: string) {
  const aud = resourceUrl(origin);
  return {
    access_token: seal("access", { ...grant, aud }, ACCESS_TOKEN_TTL),
    token_type: "Bearer",
    expires_in: ACCESS_TOKEN_TTL,
    refresh_token: seal("refresh", { ...grant, aud }, REFRESH_TOKEN_TTL),
    scope: grant.sc,
  };
}

export function readRefreshToken(token: string, clientId: string, origin: string): Grant | null {
  const data = open<Grant & { aud: string }>("refresh", token);
  if (!data || !safeEqual(data.cid, clientId) || data.aud !== resourceUrl(origin)) return null;
  return { cid: data.cid, acct: data.acct, act: data.act, em: data.em, sc: data.sc };
}

export function readAccessToken(token: string | undefined, origin: string) {
  const data = open<Grant & { aud: string; exp: number }>("access", token);
  if (!data || data.aud !== resourceUrl(origin)) return null;
  return data;
}
