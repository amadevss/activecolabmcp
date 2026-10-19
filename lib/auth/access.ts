/**
 * Punto único de control de acceso: decide qué cuentas de ActiveCollab pueden usar el servidor.
 *
 * Hoy:
 *   - Sin ACTIVECOLLAB_ALLOWED_ACCOUNT_IDS → cualquier cuenta de ActiveCollab (servicio público).
 *   - Con ACTIVECOLLAB_ALLOWED_ACCOUNT_IDS → solo esas cuentas (servidor privado de una empresa).
 *
 * Más adelante (suscripción de pago): aquí se consultará la lista de cuentas con la suscripción
 * activa. Se llama al iniciar sesión y en cada petición MCP, así que dejar de pagar corta el acceso.
 */

function allowedAccountIds(): string[] {
  return (process.env.ACTIVECOLLAB_ALLOWED_ACCOUNT_IDS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export type AccessDecision = { allowed: true } | { allowed: false; reason: string };

export async function checkAccountAccess(accountId: string): Promise<AccessDecision> {
  const allowed = allowedAccountIds();
  if (allowed.length && !allowed.includes(accountId)) {
    return { allowed: false, reason: "Esta cuenta de ActiveCollab no tiene acceso a este servidor." };
  }
  return { allowed: true };
}
