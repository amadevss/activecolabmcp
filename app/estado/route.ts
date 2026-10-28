import { authSecretStatus, open, seal } from "@/lib/auth/crypto";
import { configuredPublicOrigin, resourceUrl } from "@/lib/auth/oauth";
import { type Check, statusPage } from "@/lib/auth/pages";
import { redisStatus } from "@/lib/rate-limit";

// Diagnóstico de la configuración. No muestra ningún secreto.
export async function GET(req: Request) {
  const checks: Check[] = [];
  const visited = new URL(req.url).origin;
  const configured = configuredPublicOrigin();
  const origin = configured ?? visited;

  const secret = authSecretStatus();
  checks.push(
    secret.ok
      ? { level: "ok", title: "AUTH_SECRET", detail: "Configurada." }
      : {
          level: "bad",
          title: "AUTH_SECRET",
          detail: `${secret.reason} Agrégala en Vercel (Settings → Environment Variables, entorno Production) y vuelve a desplegar.`,
        },
  );

  if (secret.ok) {
    let works = false;
    try {
      works = !!open("client", seal("client", { test: 1 }));
    } catch {
      works = false;
    }
    checks.push(
      works
        ? { level: "ok", title: "Cifrado de tokens", detail: "Funciona." }
        : { level: "bad", title: "Cifrado de tokens", detail: "No funciona. Revisa AUTH_SECRET." },
    );
  }

  if (process.env.PUBLIC_URL?.trim() && !configured) {
    checks.push({
      level: "bad",
      title: "PUBLIC_URL",
      detail: `El valor no es una URL válida. Usa algo como https://mi-app.vercel.app`,
    });
  } else if (!configured) {
    checks.push({ level: "warn", title: "PUBLIC_URL", detail: `No está definida; se usa ${visited}. Recomendado: definirla con tu dominio.` });
  } else if (configured !== visited) {
    checks.push({
      level: "warn",
      title: "PUBLIC_URL",
      detail: `Es ${configured}, pero estás entrando por ${visited}. En Claude usa la URL de abajo (la de PUBLIC_URL).`,
    });
  } else {
    checks.push({ level: "ok", title: "PUBLIC_URL", detail: configured });
  }

  const redis = await redisStatus();
  checks.push(
    redis === "ok"
      ? { level: "ok", title: "Upstash Redis (límite de intentos)", detail: "Conectado." }
      : redis === "error"
        ? { level: "warn", title: "Upstash Redis (límite de intentos)", detail: "Configurado pero no responde. El servicio funciona sin límite de intentos." }
        : { level: "warn", title: "Upstash Redis (límite de intentos)", detail: "No configurado. El servicio funciona sin límite de intentos." },
  );

  const allowed = (process.env.ACTIVECOLLAB_ALLOWED_ACCOUNT_IDS || "").split(",").filter((s) => s.trim());
  checks.push({
    level: "ok",
    title: "Acceso",
    detail: allowed.length ? `Privado: solo ${allowed.length} cuenta(s) permitida(s).` : "Público: cualquier cuenta de ActiveCollab.",
  });

  return statusPage(checks, resourceUrl(origin));
}
