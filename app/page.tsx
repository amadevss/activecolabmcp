import Link from "next/link";
import { endpoints, pages } from "@/lib/activecollab/docs";
import { deployUrl, mcpUrl, site } from "@/lib/site";

const code = "rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-zinc-800";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-4 py-14 text-zinc-900 dark:text-zinc-100">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Conecta Claude con tu cuenta de ActiveCollab. Pídele en el chat que revise tus tareas, cree proyectos, registre
          horas o consulte facturas, y lo hace con tus permisos.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Conectar en 1 minuto</h2>
        <ol className="list-decimal space-y-3 pl-5 text-zinc-700 dark:text-zinc-300">
          <li>
            En Claude abre <strong>Ajustes → Conectores → Agregar conector personalizado</strong>.
          </li>
          <li>
            Ponle de nombre <strong>ActiveCollab</strong> y pega esta URL:
            <pre className="mt-2 whitespace-pre-wrap break-all rounded-lg bg-zinc-100 p-3 font-mono text-sm dark:bg-zinc-900">{mcpUrl}</pre>
          </li>
          <li>
            Pulsa <strong>Conectar</strong> e inicia sesión con tu cuenta de ActiveCollab (también funciona con verificación en
            dos pasos).
          </li>
          <li>En un chat, activa el conector y pregunta, por ejemplo: “¿Qué tareas tengo pendientes esta semana?”.</li>
        </ol>
        <p className="text-sm text-zinc-500">
          En Claude Code: <code className={code}>claude mcp add --transport http activecollab {mcpUrl}</code> y luego{" "}
          <code className={code}>/mcp</code> → Authenticate.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Qué puede hacer Claude</h2>
        <ul className="list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
          <li>Ver y crear proyectos, listas de tareas, tareas y subtareas.</li>
          <li>Asignar, cambiar fechas, completar y comentar tareas.</li>
          <li>Registrar y consultar horas y gastos.</li>
          <li>Buscar en todo ActiveCollab: discusiones, notas, archivos, personas.</li>
          <li>
            Cualquier otra función de la API (facturas, presupuestos, equipos, reportes…): incluye la documentación completa
            ({pages.length} páginas, {endpoints.length} endpoints) para saber cómo usarla.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Tu cuenta, tus permisos</h2>
        <ul className="list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
          <li>Cada persona inicia sesión con su propia cuenta; Claude solo puede hacer lo que tú puedes hacer.</li>
          <li>Tu contraseña solo se usa para pedir un token a ActiveCollab. No se guarda.</li>
          <li>El acceso va cifrado y solo se puede usar desde Claude.</li>
        </ul>
        <p className="text-sm text-zinc-500">
          Detalles en la <Link href="/privacidad" className="underline">política de privacidad</Link>.
        </p>
      </section>

      <section className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="text-xl font-semibold">¿Prefieres tu propio servidor?</h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          Despliega tu copia en Vercel, limitada a las cuentas de tu empresa. El código es abierto.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={deployUrl}
            className="rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Desplegar en Vercel
          </a>
          <a
            href={`${site.repoUrl}#desplegar-tu-propio-servidor`}
            className="rounded-lg border border-zinc-300 px-4 py-2 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            Ver la guía
          </a>
        </div>
      </section>
    </main>
  );
}
