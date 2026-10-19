/**
 * Cliente mínimo para la API v1 de ActiveCollab.
 *
 * Configuración (variables de entorno):
 *   ACTIVECOLLAB_ACCOUNT_ID   ID de la cuenta en la nube (el número de app.activecollab.com/123456)
 *   ACTIVECOLLAB_BASE_URL     Opcional. URL base de la instalación (por defecto https://app.activecollab.com/<ACCOUNT_ID>)
 *   ACTIVECOLLAB_TOKEN        Token de la API (recomendado; se obtiene con `npm run get-token`)
 *   ACTIVECOLLAB_EMAIL        Alternativa al token: el servidor pide uno con email y contraseña
 *   ACTIVECOLLAB_PASSWORD
 *   ACTIVECOLLAB_READ_ONLY    "true" para bloquear todo lo que no sea GET
 */

const CLOUD_LOGIN_URL = "https://activecollab.com/api/v1/external/login";
const CLIENT_VENDOR = process.env.ACTIVECOLLAB_CLIENT_VENDOR || "ActiveCollab MCP";
const CLIENT_NAME = process.env.ACTIVECOLLAB_CLIENT_NAME || "Claude MCP Server";

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

export function getConfig() {
  const accountId = process.env.ACTIVECOLLAB_ACCOUNT_ID?.trim();
  const baseUrl = (
    process.env.ACTIVECOLLAB_BASE_URL?.trim() ||
    (accountId ? `https://app.activecollab.com/${accountId}` : "")
  ).replace(/\/+$/, "");
  return {
    accountId,
    baseUrl,
    apiUrl: baseUrl ? `${baseUrl}/api/v1` : "",
    token: process.env.ACTIVECOLLAB_TOKEN?.trim(),
    email: process.env.ACTIVECOLLAB_EMAIL?.trim(),
    password: process.env.ACTIVECOLLAB_PASSWORD,
    readOnly: process.env.ACTIVECOLLAB_READ_ONLY === "true",
  };
}

async function postJson(url: string, body: unknown, headers: Record<string, string> = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", ...headers },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // respuesta no JSON
  }
  return { res, json: json as Record<string, unknown> | null, text };
}

/** Login en la nube: email + contraseña -> intent -> token para la cuenta indicada. */
export async function issueCloudToken(opts: {
  email: string;
  password: string;
  accountId: string;
  twoFactorCode?: string;
  intentId?: string;
}): Promise<string> {
  const login = opts.intentId
    ? await postJson(CLOUD_LOGIN_URL, { intent_id: opts.intentId, code: opts.twoFactorCode })
    : await postJson(CLOUD_LOGIN_URL, { email: opts.email, password: opts.password });

  const data = login.json;
  if (data?.intent_id && !data?.is_ok) {
    throw new ActiveCollabError(
      "La cuenta tiene verificación en dos pasos. Genera el token con `npm run get-token` y guárdalo en ACTIVECOLLAB_TOKEN.",
      login.res.status,
      { intent_id: data.intent_id },
    );
  }
  if (!data?.is_ok) {
    throw new ActiveCollabError(
      `No se pudo iniciar sesión en ActiveCollab: ${(data?.message as string) || login.text || login.res.status}`,
      login.res.status,
    );
  }

  const accounts = (data.accounts as Array<Record<string, unknown>>) || [];
  const account = accounts.find((a) => String(a.name) === String(opts.accountId));
  if (!account) {
    const ids = accounts.map((a) => `${a.name} (${a.display_name})`).join(", ");
    throw new ActiveCollabError(
      `El usuario no tiene acceso a la cuenta ${opts.accountId}. Cuentas disponibles: ${ids || "ninguna"}`,
    );
  }
  if (!account.intent) {
    throw new ActiveCollabError(`ActiveCollab no devolvió un intent para la cuenta ${opts.accountId}.`);
  }

  const issued = await postJson(`https://app.activecollab.com/${opts.accountId}/api/v1/issue-token`, {
    client_vendor: CLIENT_VENDOR,
    client_name: CLIENT_NAME,
    intent: account.intent,
  });
  if (!issued.json?.is_ok || !issued.json?.token) {
    throw new ActiveCollabError("ActiveCollab rechazó la emisión del token.", issued.res.status, issued.json);
  }
  return String(issued.json.token);
}

/** Instalación propia (self-hosted): POST /issue-token con usuario y contraseña. */
async function issueSelfHostedToken(apiUrl: string, email: string, password: string) {
  const issued = await postJson(`${apiUrl}/issue-token`, {
    username: email,
    password,
    client_name: CLIENT_NAME,
    client_vendor: CLIENT_VENDOR,
  });
  if (!issued.json?.is_ok || !issued.json?.token) {
    throw new ActiveCollabError(
      `No se pudo obtener el token: ${(issued.json?.message as string) || issued.res.status}`,
      issued.res.status,
    );
  }
  return String(issued.json.token);
}

// El token obtenido con email/contraseña se guarda en memoria mientras la función siga viva.
let cachedToken: string | undefined;

async function getToken(forceRefresh = false): Promise<string> {
  const cfg = getConfig();
  if (cfg.token) return cfg.token;
  if (cachedToken && !forceRefresh) return cachedToken;
  if (!cfg.email || !cfg.password) {
    throw new ActiveCollabError(
      "Falta configurar ActiveCollab: define ACTIVECOLLAB_TOKEN, o ACTIVECOLLAB_EMAIL y ACTIVECOLLAB_PASSWORD.",
    );
  }
  cachedToken = cfg.accountId && !process.env.ACTIVECOLLAB_BASE_URL
    ? await issueCloudToken({ email: cfg.email, password: cfg.password, accountId: cfg.accountId })
    : await issueSelfHostedToken(cfg.apiUrl, cfg.email, cfg.password);
  return cachedToken;
}

export type RequestOptions = {
  query?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
};

/** Construye la URL final. `path` es relativo a /api/v1, p. ej. "/projects/1/tasks". */
export function buildUrl(path: string, query?: RequestOptions["query"]) {
  const cfg = getConfig();
  if (!cfg.apiUrl) {
    throw new ActiveCollabError("Falta configurar ACTIVECOLLAB_ACCOUNT_ID (o ACTIVECOLLAB_BASE_URL).");
  }
  const clean = path.trim().replace(/^https?:\/\/[^/]+/i, "").replace(/^\/?api\/v1/, "");
  if (clean.includes("..")) throw new ActiveCollabError("Ruta no válida.");
  const url = new URL(cfg.apiUrl + "/" + clean.replace(/^\/+/, ""));
  for (const [k, v] of Object.entries(query || {})) {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
  }
  return url;
}

export async function acRequest<T = unknown>(
  method: HttpMethod,
  path: string,
  opts: RequestOptions = {},
): Promise<T> {
  const cfg = getConfig();
  if (cfg.readOnly && method !== "GET") {
    throw new ActiveCollabError(
      "El servidor está en modo solo lectura (ACTIVECOLLAB_READ_ONLY=true). Solo se permiten peticiones GET.",
    );
  }
  const url = buildUrl(path, opts.query);

  const send = async (token: string) =>
    fetch(url, {
      method,
      headers: {
        "X-Angie-AuthApiToken": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: method === "GET" ? undefined : JSON.stringify(opts.body ?? {}),
      cache: "no-store",
    });

  let res = await send(await getToken());
  // Si el token automático caducó, se pide uno nuevo una sola vez.
  if (res.status === 401 && !cfg.token && (cfg.email || cachedToken)) {
    res = await send(await getToken(true));
  }

  const text = await res.text();
  let data: unknown = text;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // se devuelve como texto
  }

  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && "message" in data && String((data as { message: unknown }).message)) ||
      res.statusText;
    // Las respuestas de error de ActiveCollab traen trazas internas largas; se recortan.
    if (data && typeof data === "object") delete (data as Record<string, unknown>).trace;
    throw new ActiveCollabError(`ActiveCollab respondió ${res.status} en ${method} ${url.pathname}: ${msg}`, res.status, data);
  }
  return data as T;
}
