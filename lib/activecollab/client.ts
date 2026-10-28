import { AsyncLocalStorage } from "node:async_hooks";

/**
 * Cliente para la API v1 de ActiveCollab (nube).
 *
 * Cada petición usa las credenciales de la persona conectada (las pone el endpoint MCP
 * después de validar su access token). El servidor no tiene credenciales propias.
 */

export type AcCredentials = {
  accountId: string;
  token: string;
  email?: string;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export class ActiveCollabError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly details?: unknown,
  ) {
    super(message);
    this.name = "ActiveCollabError";
  }
}

// Solo para pruebas locales: permiten apuntar a un simulador. En producción no se definen.
const CLOUD_BASE = (process.env.ACTIVECOLLAB_CLOUD_BASE_URL || "https://app.activecollab.com").replace(/\/+$/, "");
const LOGIN_URL = process.env.ACTIVECOLLAB_LOGIN_URL || "https://activecollab.com/api/v1/external/login";

const CLIENT_VENDOR = "ActiveCollab MCP";
const CLIENT_NAME = "Claude";

export function getConfig() {
  return { readOnly: process.env.ACTIVECOLLAB_READ_ONLY === "true" };
}

export function accountBaseUrl(accountId: string) {
  if (!/^\d{1,12}$/.test(accountId)) throw new ActiveCollabError("ID de cuenta no válido.");
  return `${CLOUD_BASE}/${accountId}`;
}

// ---------- credenciales de la petición en curso ----------

const credentialsStore = new AsyncLocalStorage<AcCredentials>();

export function runWithCredentials<T>(creds: AcCredentials, fn: () => T): T {
  return credentialsStore.run(creds, fn);
}

export function currentCredentials(): AcCredentials {
  const creds = credentialsStore.getStore();
  if (!creds) throw new ActiveCollabError("No hay una sesión de ActiveCollab activa. Vuelve a conectar el conector en Claude.");
  return creds;
}

// ---------- login en la nube (lo usa la página de autorización) ----------

async function postJson(url: string, body: unknown, headers: Record<string, string> = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...headers },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(20_000),
  });
  const text = await res.text();
  let json: Record<string, unknown> | null = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // respuesta no JSON
  }
  return { res, json };
}

export type CloudAccount = { id: string; name: string; intent: string };

export type CloudLoginResult =
  | { status: "ok"; accounts: CloudAccount[]; displayName?: string }
  | { status: "two_factor"; intentId: string }
  | { status: "error"; message: string };

function parseLogin(json: Record<string, unknown> | null, status: number): CloudLoginResult {
  if (json?.intent_id && !json?.is_ok) return { status: "two_factor", intentId: String(json.intent_id) };
  if (!json?.is_ok) {
    const msg = typeof json?.message === "string" ? json.message : `Error ${status}`;
    return { status: "error", message: msg };
  }
  const accounts = ((json.accounts as Array<Record<string, unknown>>) || [])
    .filter(
      (a) =>
        a.intent &&
        (a.class === "FeatherApplicationInstance" || a.class === "ActiveCollab\\Shepherd\\Model\\Account\\ActiveCollab\\FeatherAccount"),
    )
    .map((a) => ({ id: String(a.name), name: String(a.display_name || a.name), intent: String(a.intent) }))
    .filter((a) => /^\d{1,12}$/.test(a.id));
  const user = json.user as Record<string, unknown> | undefined;
  const displayName = [user?.first_name, user?.last_name].filter(Boolean).join(" ") || undefined;
  return { status: "ok", accounts, displayName };
}

export async function cloudLogin(email: string, password: string): Promise<CloudLoginResult> {
  const { res, json } = await postJson(LOGIN_URL, { email, password });
  return parseLogin(json, res.status);
}

export async function cloudLoginTwoFactor(intentId: string, code: string): Promise<CloudLoginResult> {
  const { res, json } = await postJson(LOGIN_URL, { intent_id: intentId, code });
  return parseLogin(json, res.status);
}

export async function issueAccountToken(accountId: string, intent: string): Promise<string> {
  const { res, json } = await postJson(`${accountBaseUrl(accountId)}/api/v1/issue-token`, {
    client_vendor: CLIENT_VENDOR,
    client_name: CLIENT_NAME,
    intent,
  });
  if (!json?.is_ok || !json?.token) {
    throw new ActiveCollabError("ActiveCollab no emitió el token de acceso.", res.status);
  }
  return String(json.token);
}

// ---------- peticiones a la API ----------

export type RequestOptions = {
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
};

/** `path` es relativo a /api/v1, p. ej. "/projects/1/tasks". */
export function buildUrl(accountId: string, path: string, query?: RequestOptions["query"]) {
  const clean = path.trim().replace(/^https?:\/\/[^/]+/i, "").replace(/^\/?api\/v1/, "");
  if (clean.includes("..") || clean.includes("\\") || /[\r\n]/.test(clean)) {
    throw new ActiveCollabError("Ruta no válida.");
  }
  const apiRoot = `${accountBaseUrl(accountId)}/api/v1`;
  const url = new URL(apiRoot + "/" + clean.replace(/^\/+/, ""));
  // La URL final siempre debe quedar dentro de la API de la cuenta.
  if (!url.href.startsWith(apiRoot + "/") && url.href !== apiRoot) throw new ActiveCollabError("Ruta no válida.");
  for (const [k, v] of Object.entries(query || {})) {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
  }
  return url;
}

export async function acRequest<T = unknown>(
  method: HttpMethod,
  path: string,
  opts: RequestOptions = {},
  creds: AcCredentials = currentCredentials(),
): Promise<T> {
  if (getConfig().readOnly && method !== "GET") {
    throw new ActiveCollabError(
      "El servidor está en modo solo lectura (ACTIVECOLLAB_READ_ONLY=true). Solo se permiten consultas.",
    );
  }
  const url = buildUrl(creds.accountId, path, opts.query);
  const res = await fetch(url, {
    method,
    headers: {
      "X-Angie-AuthApiToken": creds.token,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: method === "GET" ? undefined : JSON.stringify(opts.body ?? {}),
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(30_000),
  });

  const text = await res.text();
  let data: unknown = text;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // se devuelve como texto
  }

  if (!res.ok) {
    if (res.status === 401) {
      throw new ActiveCollabError(
        "ActiveCollab rechazó la sesión (token revocado o caducado). Desconecta y vuelve a conectar el conector en Claude.",
        401,
      );
    }
    const msg =
      (data && typeof data === "object" && "message" in data && String((data as { message: unknown }).message)) ||
      res.statusText;
    // Las respuestas de error de ActiveCollab traen trazas internas largas; se quitan.
    if (data && typeof data === "object") {
      delete (data as Record<string, unknown>).trace;
      delete (data as Record<string, unknown>).file;
      delete (data as Record<string, unknown>).line;
    }
    throw new ActiveCollabError(`ActiveCollab respondió ${res.status} en ${method} ${url.pathname}: ${msg}`, res.status, data);
  }
  return data as T;
}
