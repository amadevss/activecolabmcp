/**
 * Datos del servicio que se muestran en las páginas públicas.
 * Quien despliegue su propia copia puede cambiarlos con variables de entorno.
 */
export const site = {
  name: process.env.SERVICE_NAME || "ActiveCollab MCP",
  ownerName: process.env.SERVICE_OWNER_NAME || "Bryan Oliveros Pérez",
  contactEmail: process.env.SERVICE_CONTACT_EMAIL || "grupoconnectados@gmail.com",
  repoUrl: "https://github.com/amadevss/activecolabmcp",
  policiesUpdated: "19 de octubre de 2026",
};

/** URL pública (PUBLIC_URL o el dominio de producción que Vercel pone en el build). */
export const publicUrl =
  process.env.PUBLIC_URL?.replace(/\/+$/, "") ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://<este-sitio>");

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
