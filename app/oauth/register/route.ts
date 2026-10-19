import { corsPreflight, jsonResponse, oauthError } from "@/lib/auth/http";
import { type AuthMethod, isAllowedRedirectUri, registerClient, SCOPE } from "@/lib/auth/oauth";

// Registro dinámico de clientes (RFC 7591). Claude se registra solo al agregar el conector.
// No se guarda nada: el client_id es un token cifrado con las redirect_uris permitidas.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = JSON.parse((await req.text()).slice(0, 16 * 1024));
  } catch {
    return oauthError("invalid_client_metadata", "El cuerpo debe ser JSON.");
  }

  const redirectUris = body.redirect_uris;
  if (!Array.isArray(redirectUris) || redirectUris.length === 0 || redirectUris.length > 10) {
    return oauthError("invalid_redirect_uri", "redirect_uris es obligatorio (1 a 10 URLs).");
  }
  for (const uri of redirectUris) {
    if (typeof uri !== "string" || uri.length > 500 || !isAllowedRedirectUri(uri)) {
      return oauthError(
        "invalid_redirect_uri",
        `redirect_uri no permitida: ${String(uri).slice(0, 200)}. Este servidor solo acepta clientes de Claude.`,
      );
    }
  }

  const method = (body.token_endpoint_auth_method as string) || "none";
  if (!["none", "client_secret_post", "client_secret_basic"].includes(method)) {
    return oauthError("invalid_client_metadata", "token_endpoint_auth_method no soportado.");
  }
  const grantTypes = (body.grant_types as string[]) || ["authorization_code", "refresh_token"];
  if (!Array.isArray(grantTypes) || grantTypes.some((g) => !["authorization_code", "refresh_token"].includes(g))) {
    return oauthError("invalid_client_metadata", "grant_types no soportado.");
  }

  const clientName = typeof body.client_name === "string" ? body.client_name.slice(0, 80) : "Cliente MCP";
  const { client_id, client_secret, iat } = registerClient({
    redirect_uris: redirectUris as string[],
    client_name: clientName,
    auth_method: method as AuthMethod,
  });

  return jsonResponse(
    {
      client_id,
      ...(client_secret ? { client_secret, client_secret_expires_at: 0 } : {}),
      client_id_issued_at: iat,
      client_name: clientName,
      redirect_uris: redirectUris,
      grant_types: grantTypes,
      response_types: ["code"],
      token_endpoint_auth_method: method,
      scope: SCOPE,
    },
    201,
  );
}

export const OPTIONS = corsPreflight;
