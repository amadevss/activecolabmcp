import { handleMcpRequest } from "@/lib/mcp/handler";

// Endpoint MCP con la clave en la cabecera: Authorization: Bearer <MCP_SECRET>
export const maxDuration = 60;

const handler = (req: Request) => handleMcpRequest(req);

export { handler as GET, handler as POST, handler as DELETE };
