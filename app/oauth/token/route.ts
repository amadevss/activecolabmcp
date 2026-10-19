import { acRequest, ActiveCollabError } from "@/lib/activecollab/client";
import { corsPreflight, jsonResponse, oauthError, readParams } from "@/lib/auth/http";
import { authenticateClient, issueTokens, publicOrigin, readClient, readRefreshToken, redeemCode } from "@/lib/auth/oauth";

function basicAuth(req: Request): { id?: string; secret?: string } {
  const m = req.headers.get("authorization")?.match(/^Basic\s+(.+)$/i);
  if (!m) return {};
  try {
    const [id, ...rest] = Buffer.from(m[1], "base64").toString("utf8").split(":");
    return { id: decodeURIComponent(id), secret: decodeURIComponent(rest.join(":")) };
  } catch {
    return {};
  }
}

export async function POST(req: Request) {
  const origin = publicOrigin(req);
  const p = await readParams(req);
  const basic = basicAuth(req);
  const clientId = basic.id || p.client_id || "";
  const client = readClient(clientId);
  if (!client) return oauthError("invalid_client", "Cliente no válido.", 401);
  if (!authenticateClient(client, clientId, basic.secret ?? p.client_secret)) {
    return oauthError("invalid_client", "Autenticación del cliente fallida.", 401);
  }

  if (p.grant_type === "authorization_code") {
    if (!p.redirect_uri && client.ru.length !== 1) return oauthError("invalid_request", "Falta redirect_uri.");
    const grant = redeemCode(p.code || "", clientId, p.redirect_uri ?? null, p.code_verifier ?? null);
    if (!grant) return oauthError("invalid_grant", "Código inválido, caducado o PKCE incorrecto.");
    return jsonResponse(issueTokens(grant, origin));
  }

  if (p.grant_type === "refresh_token") {
    const grant = readRefreshToken(p.refresh_token || "", clientId, origin);
    if (!grant) return oauthError("invalid_grant", "Refresh token inválido o caducado.");
    // Antes de renovar, se comprueba que el token de ActiveCollab siga activo (no revocado).
    try {
      await acRequest("GET", "/user-session", {}, { accountId: grant.acct, token: grant.act, email: grant.em });
    } catch (err) {
      if (err instanceof ActiveCollabError && (err.status === 401 || err.status === 403)) {
        return oauthError("invalid_grant", "El acceso a ActiveCollab fue revocado. Vuelve a iniciar sesión.");
      }
      return oauthError("temporarily_unavailable", "No se pudo verificar la sesión con ActiveCollab.", 503);
    }
    return jsonResponse(issueTokens(grant, origin));
  }

  return oauthError("unsupported_grant_type", "grant_type no soportado.");
}

export const OPTIONS = corsPreflight;
