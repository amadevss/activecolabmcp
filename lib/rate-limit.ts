import { createHash } from "node:crypto";
import { Ratelimit, type Duration } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Límite de intentos con Upstash Redis.
 *
 * Protege el login contra pruebas masivas de contraseñas. Sin eso, ActiveCollab podría
 * bloquear la IP del servidor y el servicio se caería para todos.
 *
 * Variables (las crea solas la integración de Upstash en Vercel):
 *   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
 *   o KV_REST_API_URL / KV_REST_API_TOKEN
 * Si no están, el límite queda desactivado y el servidor funciona igual.
 */

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

export const rateLimitEnabled = !!redis;

const RULES = {
  // Intentos de login por IP y por email.
  loginIp: { tokens: 10, window: "10 m" },
  loginEmail: { tokens: 5, window: "15 m" },
  // Códigos de verificación en dos pasos por IP.
  twoFactorIp: { tokens: 10, window: "10 m" },
  // Registro de clientes y emisión de tokens por IP.
  register: { tokens: 30, window: "1 h" },
  token: { tokens: 60, window: "1 m" },
} satisfies Record<string, { tokens: number; window: Duration }>;

export type RateRule = keyof typeof RULES;

const limiters = new Map<RateRule, Ratelimit>();

function limiter(rule: RateRule): Ratelimit | null {
  if (!redis) return null;
  let l = limiters.get(rule);
  if (!l) {
    const { tokens, window } = RULES[rule];
    l = new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(tokens, window), prefix: `acmcp:rl:${rule}` });
    limiters.set(rule, l);
  }
  return l;
}

/** IP del cliente según Vercel. */
export function clientIp(req: Request): string {
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

/** Los emails se guardan como hash: Redis nunca ve el email en claro. */
export const hashKey = (value: string) => createHash("sha256").update(value.trim().toLowerCase()).digest("base64url");

export type RateResult = { ok: true } | { ok: false; retryAfterSeconds: number };

/** Comprueba y cuenta un intento. Si Redis falla, deja pasar (prioriza que el servicio siga en pie). */
export async function rateLimit(rule: RateRule, key: string): Promise<RateResult> {
  const l = limiter(rule);
  if (!l) return { ok: true };
  try {
    const res = await l.limit(key);
    if (res.success) return { ok: true };
    return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((res.reset - Date.now()) / 1000)) };
  } catch (err) {
    console.warn("rate-limit: Redis no disponible, se permite la petición", (err as Error)?.message);
    return { ok: true };
  }
}

/** Comprueba varias reglas; devuelve el primer bloqueo. */
export async function rateLimitAll(checks: [RateRule, string][]): Promise<RateResult> {
  const results = await Promise.all(checks.map(([rule, key]) => rateLimit(rule, key)));
  return results.find((r) => !r.ok) ?? { ok: true };
}

export function waitMessage(seconds: number) {
  const minutes = Math.ceil(seconds / 60);
  return minutes > 1 ? `Demasiados intentos. Espera ${minutes} minutos y vuelve a probar.` : "Demasiados intentos. Espera un minuto y vuelve a probar.";
}
