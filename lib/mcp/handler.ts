import { createHash, timingSafeEqual } from "node:crypto";
import { createMcpHandler } from "mcp-handler";
import { registerTools, SERVER_INSTRUCTIONS } from "./tools";

const mcpHandler = createMcpHandler(
  (server) => {
    registerTools(server);
  },
  {
    serverInfo: { name: "activecollab-mcp", version: "1.0.0" },
    instructions: SERVER_INSTRUCTIONS,
  },
  {
    basePath: "/api",
    maxDuration: 60,
    verboseLogs: process.env.NODE_ENV === "development",
    disableSse: true,
  },
);

function sameSecret(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

const json = (status: number, error: string) =>
  Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });

/**
 * Valida la clave y pasa la petición al servidor MCP.
 * La clave puede llegar en la ruta (/api/mcp/<clave>, para los conectores de Claude)
 * o en la cabecera Authorization: Bearer <clave> (para Claude Code / Desktop).
 */
export async function handleMcpRequest(req: Request, keyFromPath?: string) {
  const expected = process.env.MCP_SECRET;
  if (!expected || expected.length < 16) {
    return json(500, "El servidor no tiene configurada MCP_SECRET (mínimo 16 caracteres).");
  }
  const bearer = req.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
  const provided = keyFromPath ?? bearer;
  if (!provided || !sameSecret(provided, expected)) {
    return json(401, "Clave de acceso inválida.");
  }

  // mcp-handler solo atiende la ruta exacta /api/mcp, así que reescribimos la URL.
  const url = new URL(req.url);
  url.pathname = "/api/mcp";
  const hasBody = !["GET", "HEAD"].includes(req.method);
  const forwarded = new Request(url, {
    method: req.method,
    headers: req.headers,
    body: hasBody ? await req.arrayBuffer() : undefined,
    signal: req.signal,
  });
  return mcpHandler(forwarded);
}
