/**
 * Datos del servicio que se muestran en las páginas públicas.
 * Quien despliegue su propia copia puede cambiarlos con variables de entorno.
 */
export const site = {
  name: process.env.SERVICE_NAME || "ActiveCollab MCP",
  tagline: "Conecta Claude con ActiveCollab",
  description:
    "Conecta Claude con tu cuenta de ActiveCollab en un minuto. Revisa tareas, crea proyectos, registra horas y consulta facturas desde el chat, con tus propios permisos.",
  keywords: [
    "ActiveCollab",
    "Claude",
    "MCP",
    "Model Context Protocol",
    "conector",
    "gestión de proyectos",
    "IA",
    "automatización",
    "tareas",
    "registro de horas",
  ],
  ownerName: process.env.SERVICE_OWNER_NAME || "Bryan Oliveros Pérez",
  contactEmail: process.env.SERVICE_CONTACT_EMAIL || "grupoconnectados@gmail.com",
  repoUrl: "https://github.com/amadevss/activecolabmcp",
  policiesUpdated: "19 de octubre de 2026",
};

/** Normaliza una URL ("mi-app.vercel.app", ".../api/mcp", etc.) a su origen. */
function toOrigin(raw: string | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;
  try {
    return new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`).origin;
  } catch {
    return null;
  }
}

/** URL pública: PUBLIC_URL, o el dominio de producción que Vercel pone en el build. */
export const publicUrl =
  toOrigin(process.env.PUBLIC_URL) ?? toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL) ?? "http://localhost:3000";

export const mcpUrl = `${publicUrl}/api/mcp`;

/** Botón "Deploy" de Vercel: clona el repo y pide las variables obligatorias. */
export const deployUrl =
  "https://vercel.com/new/clone?" +
  new URLSearchParams({
    "repository-url": site.repoUrl,
    "project-name": "activecollab-mcp",
    env: "AUTH_SECRET,ACTIVECOLLAB_ALLOWED_ACCOUNT_IDS,SERVICE_OWNER_NAME,SERVICE_CONTACT_EMAIL",
    envDescription:
      "AUTH_SECRET: clave aleatoria de al menos 32 caracteres. ACTIVECOLLAB_ALLOWED_ACCOUNT_IDS: el ID de tu cuenta de ActiveCollab (el número de app.activecollab.com/123456). SERVICE_OWNER_NAME y SERVICE_CONTACT_EMAIL: tu nombre o empresa y tu email, para la política de privacidad.",
    envLink: `${site.repoUrl}#desplegar-tu-propio-servidor`,
  }).toString();
