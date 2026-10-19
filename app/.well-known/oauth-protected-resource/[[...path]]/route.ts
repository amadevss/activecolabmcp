import { corsPreflight, jsonResponse } from "@/lib/auth/http";
import { publicOrigin, resourceUrl, SCOPE } from "@/lib/auth/oauth";

// Metadatos del recurso protegido (RFC 9728): le dice a Claude dónde iniciar sesión.
export async function GET(req: Request) {
  const origin = publicOrigin(req);
  return jsonResponse({
    resource: resourceUrl(origin),
    authorization_servers: [origin],
    scopes_supported: [SCOPE],
    bearer_methods_supported: ["header"],
    resource_name: "ActiveCollab",
  });
}

export const OPTIONS = corsPreflight;
