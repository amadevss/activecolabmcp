import { endpoints, pages } from "@/lib/activecollab/docs";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-16 font-sans text-zinc-900 dark:text-zinc-100">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">ActiveCollab MCP</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Servidor MCP que conecta Claude con ActiveCollab. Incluye la documentación de la API ({pages.length} páginas,{" "}
          {endpoints.length} endpoints) para que Claude pueda usar cualquier función.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">Conectar en Claude</h2>
        <ol className="list-decimal space-y-2 pl-5 text-zinc-700 dark:text-zinc-300">
          <li>
            En Claude abre <strong>Ajustes → Conectores → Agregar conector personalizado</strong>.
          </li>
          <li>
            Pega esta URL (la misma para todo el equipo):
            <pre className="mt-2 overflow-x-auto rounded-lg bg-zinc-100 p-3 text-sm dark:bg-zinc-900">
              https://&lt;este-sitio&gt;/api/mcp
            </pre>
          </li>
          <li>Pulsa <strong>Conectar</strong> e inicia sesión con tu cuenta de ActiveCollab.</li>
          <li>Activa el conector en el chat y pídele a Claude, por ejemplo: “¿Qué tareas tengo pendientes esta semana?”.</li>
        </ol>
        <p className="text-sm text-zinc-500">
          Cada persona usa su propia cuenta y sus propios permisos. Tu contraseña solo se usa para pedir un token a
          ActiveCollab y no se guarda.
        </p>
      </section>

      <p className="text-sm text-zinc-500">
        Guía completa en el README del repositorio.
      </p>
    </main>
  );
}
