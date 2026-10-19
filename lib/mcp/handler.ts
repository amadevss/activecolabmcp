import { createMcpHandler, withMcpAuth } from "mcp-handler";
import { runWithCredentials } from "@/lib/activecollab/client";
import { checkAccountAccess } from "@/lib/auth/access";
import { publicOrigin, readAccessToken, SCOPE } from "@/lib/auth/oauth";
import { registerTools, SERVER_INSTRUCTIONS } from "./tools";

const mcpHandler = createMcpHandler(
  (server) => {
    registerTools(server);
  },
  {
    serverInfo: { name: "activecollab-mcp", version: "2.0.0" },
    instructions: SERVER_INSTRUCTIONS,
  },
  {
    basePath: "/api",
    maxDuration: 60,
    verboseLogs: process.env.NODE_ENV === "development",
    disableSse: true,
  },
);

/**
 * Endpoint MCP protegido con OAuth.
 * Sin token válido responde 401 con la dirección de los metadatos, y Claude inicia el login solo.
 * Con token válido, cada herramienta usa la cuenta de ActiveCollab de esa persona.
 */
export async function handleMcpRequest(req: Request) {
  const origin = publicOrigin(req);

  const authed = withMcpAuth(
    (request: Request) => {
      const extra = request.auth?.extra as { acct: string; act: string; em: string } | undefined;
      if (!extra) return new Response("Unauthorized", { status: 401 });
      return runWithCredentials({ accountId: extra.acct, token: extra.act, email: extra.em }, () => mcpHandler(request));
    },
    async (_req, bearerToken) => {
      const data = readAccessToken(bearerToken, origin);
      if (!data) return undefined;
      if (!(await checkAccountAccess(data.acct)).allowed) return undefined;
      return {
        token: bearerToken!,
        clientId: data.cid,
        scopes: [SCOPE],
        expiresAt: data.exp,
        resource: new URL(data.aud),
        extra: { acct: data.acct, act: data.act, em: data.em },
      };
    },
    { required: true, resourceUrl: origin, resourceMetadataPath: "/.well-known/oauth-protected-resource" },
  );

  return authed(req);
}
