import { handleMcpRequest } from "@/lib/mcp/handler";

// Endpoint MCP. Cada persona se conecta con su propia cuenta de ActiveCollab vía OAuth.
export const maxDuration = 60;

const handler = (req: Request) => handleMcpRequest(req);

export { handler as GET, handler as POST, handler as DELETE };
