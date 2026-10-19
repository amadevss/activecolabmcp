import { handleMcpRequest } from "@/lib/mcp/handler";

// Endpoint MCP con la clave en la URL: /api/mcp/<MCP_SECRET>
// Es el que se usa como conector personalizado en claude.ai.
export const maxDuration = 60;

const handler = async (req: Request, ctx: RouteContext<"/api/mcp/[key]">) => {
  const { key } = await ctx.params;
  return handleMcpRequest(req, decodeURIComponent(key));
};

export { handler as GET, handler as POST, handler as DELETE };
