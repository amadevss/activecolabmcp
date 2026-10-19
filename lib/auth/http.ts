/** Respuestas JSON para los endpoints OAuth (con CORS abierto: no usan cookies). */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, MCP-Protocol-Version",
  "Access-Control-Max-Age": "86400",
};

export function jsonResponse(data: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", Pragma: "no-cache", ...CORS, ...extra },
  });
}

export function oauthError(error: string, description: string, status = 400, extra: Record<string, string> = {}) {
  return jsonResponse({ error, error_description: description }, status, extra);
}

export function corsPreflight() {
  return new Response(null, { status: 204, headers: CORS });
}

/** Lee el cuerpo como formulario o JSON (los clientes OAuth usan uno u otro). */
export async function readParams(req: Request): Promise<Record<string, string>> {
  const type = req.headers.get("content-type") || "";
  const text = (await req.text()).slice(0, 64 * 1024);
  if (type.includes("application/json")) {
    try {
      const obj = JSON.parse(text);
      return Object.fromEntries(Object.entries(obj ?? {}).map(([k, v]) => [k, typeof v === "string" ? v : JSON.stringify(v)]));
    } catch {
      return {};
    }
  }
  return Object.fromEntries(new URLSearchParams(text));
}
