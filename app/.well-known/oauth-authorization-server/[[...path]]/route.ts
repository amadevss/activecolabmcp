import { corsPreflight, jsonResponse } from "@/lib/auth/http";
import { publicOrigin, SCOPE } from "@/lib/auth/oauth";

// Metadatos del servidor de autorización (RFC 8414).
export async function GET(req: Request) {
  const origin = publicOrigin(req);
  return jsonResponse({
    issuer: origin,
    authorization_endpoint: `${origin}/oauth/authorize`,
    token_endpoint: `${origin}/oauth/token`,
    registration_endpoint: `${origin}/oauth/register`,
    scopes_supported: [SCOPE],
    response_types_supported: ["code"],
    response_modes_supported: ["query"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none", "client_secret_post", "client_secret_basic"],
    authorization_response_iss_parameter_supported: true,
    service_documentation: `${origin}/`,
  });
}

export const OPTIONS = corsPreflight;
