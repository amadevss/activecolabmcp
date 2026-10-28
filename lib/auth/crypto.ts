import { createCipheriv, createDecipheriv, createHash, createHmac, hkdfSync, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Tokens sellados (cifrados y autenticados) con AES-256-GCM.
 *
 * - La clave maestra es AUTH_SECRET. De ella se deriva (HKDF) una clave distinta por "propósito",
 *   así un token de un tipo (p. ej. un código de autorización) nunca sirve como otro (p. ej. un access token).
 * - Todo el contenido va cifrado: el token de ActiveCollab nunca viaja en claro dentro de nuestros tokens.
 * - Cada token lleva fecha de caducidad (exp, en segundos) que se comprueba al abrirlo.
 * - Si cambias AUTH_SECRET, todos los tokens emitidos dejan de valer (revocación global).
 */

export type Purpose = "client" | "authreq" | "pending" | "code" | "access" | "refresh";

const PREFIX: Record<Purpose, string> = {
  client: "acm_cl_",
  authreq: "acm_rq_",
  pending: "acm_pd_",
  code: "acm_cd_",
  access: "acm_at_",
  refresh: "acm_rt_",
};

const keyCache = new Map<string, Buffer>();

/** Estado de AUTH_SECRET (sin revelar su valor). */
export function authSecretStatus(): { ok: true } | { ok: false; reason: string } {
  const secret = process.env.AUTH_SECRET?.trim();
  if (!secret) return { ok: false, reason: "AUTH_SECRET no está configurada." };
  if (secret.length < 32) return { ok: false, reason: `AUTH_SECRET es demasiado corta (${secret.length} caracteres; mínimo 32).` };
  return { ok: true };
}

function masterSecret(): string {
  const status = authSecretStatus();
  if (!status.ok) throw new Error(status.reason);
  return process.env.AUTH_SECRET!.trim();
}

function key(label: string): Buffer {
  const secret = masterSecret();
  const cacheKey = `${label}:${secret}`;
  let k = keyCache.get(cacheKey);
  if (!k) {
    k = Buffer.from(hkdfSync("sha256", secret, "activecollab-mcp/v1", label, 32));
    keyCache.set(cacheKey, k);
  }
  return k;
}

export const nowSeconds = () => Math.floor(Date.now() / 1000);

export function seal(purpose: Purpose, payload: Record<string, unknown>, ttlSeconds?: number): string {
  const body = ttlSeconds ? { ...payload, exp: nowSeconds() + ttlSeconds } : payload;
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(`seal:${purpose}`), iv);
  cipher.setAAD(Buffer.from(purpose));
  const ct = Buffer.concat([cipher.update(JSON.stringify(body), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return PREFIX[purpose] + Buffer.concat([iv, ct, tag]).toString("base64url");
}

/** Abre un token. Devuelve null si es inválido, de otro tipo, manipulado o caducado. */
export function open<T extends Record<string, unknown>>(purpose: Purpose, token: string | null | undefined): T | null {
  if (!token || typeof token !== "string" || !token.startsWith(PREFIX[purpose]) || token.length > 8192) return null;
  try {
    const raw = Buffer.from(token.slice(PREFIX[purpose].length), "base64url");
    if (raw.length < 12 + 16 + 2) return null;
    const iv = raw.subarray(0, 12);
    const tag = raw.subarray(raw.length - 16);
    const ct = raw.subarray(12, raw.length - 16);
    const decipher = createDecipheriv("aes-256-gcm", key(`seal:${purpose}`), iv);
    decipher.setAAD(Buffer.from(purpose));
    decipher.setAuthTag(tag);
    const json = Buffer.concat([decipher.update(ct), decipher.final()]).toString("utf8");
    const payload = JSON.parse(json) as T & { exp?: number };
    if (typeof payload.exp === "number" && payload.exp < nowSeconds()) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Secreto de cliente derivado del client_id (no hace falta guardarlo). */
export function clientSecretFor(clientId: string): string {
  return createHmac("sha256", key("client-secret")).update(clientId).digest("base64url");
}

export function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function sha256base64url(input: string): string {
  return createHash("sha256").update(input).digest("base64url");
}

export function randomId(bytes = 24): string {
  return randomBytes(bytes).toString("base64url");
}
