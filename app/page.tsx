import Link from "next/link";
import type { ReactNode } from "react";
import { Tabs } from "@/components/connect-tabs";
import { CopyField } from "@/components/copy-button";
import {
  ArrowRightIcon,
  BookIcon,
  ChatIcon,
  ChevronIcon,
  ClockIcon,
  FolderIcon,
  GithubIcon,
  KeyIcon,
  LockIcon,
  SearchIcon,
  ServerIcon,
  ShieldIcon,
  TasksIcon,
  UserIcon,
} from "@/components/icons";
import { endpoints, pages } from "@/lib/activecollab/docs";
import { deployUrl, mcpUrl, publicUrl, site } from "@/lib/site";

const FEATURES = [
  { icon: TasksIcon, title: "Tareas", text: "Lista, crea, asigna, cambia fechas, completa y comenta tareas y subtareas." },
  { icon: FolderIcon, title: "Proyectos", text: "Consulta tus proyectos, crea nuevos y organiza sus listas de tareas." },
  { icon: ClockIcon, title: "Horas y gastos", text: "Registra tiempo y gastos, y pide resúmenes por proyecto, persona o fechas." },
  { icon: SearchIcon, title: "Búsqueda", text: "Encuentra discusiones, notas, archivos y personas en toda tu cuenta." },
  { icon: ChatIcon, title: "Lenguaje natural", text: "Pídelo como se lo dirías a un compañero, en español o en inglés." },
  {
    icon: BookIcon,
    title: "Toda la API",
    text: `Facturas, presupuestos, equipos, reportes… Incluye la documentación completa (${pages.length} páginas, ${endpoints.length} endpoints).`,
  },
];

const SECURITY = [
  { icon: UserIcon, title: "Tus permisos", text: "Cada persona entra con su cuenta. Claude solo puede hacer lo que tú puedes hacer." },
  { icon: KeyIcon, title: "Sin guardar contraseñas", text: "Tu contraseña solo se usa para pedir un token a ActiveCollab y no se almacena." },
  { icon: LockIcon, title: "Acceso cifrado", text: "Tokens cifrados con AES-256 que solo funcionan desde Claude." },
  { icon: ShieldIcon, title: "Login protegido", text: "OAuth 2.1 con PKCE, verificación en dos pasos y límite de intentos." },
];

const PROMPTS = [
  "¿Qué tareas tengo pendientes esta semana?",
  "Crea la tarea “Revisar maqueta” en el proyecto Web para el viernes",
  "Registra 2,5 horas hoy en la tarea 34: reunión con cliente",
  "¿Cuántas horas registró el equipo este mes en el proyecto Web?",
  "Resume los comentarios de la tarea “Rediseño home”",
  "¿Qué facturas siguen pendientes de pago?",
];

const FAQ = [
  {
    q: "¿Cuánto cuesta?",
    a: "Por ahora es gratis. Si en el futuro hay una cuota para cubrir el servidor, se avisará antes y nunca se cobrará sin tu consentimiento.",
  },
  {
    q: "¿Necesito un plan de pago de Claude?",
    a: "Necesitas una cuenta de Claude con acceso a conectores personalizados. La disponibilidad depende de tu plan de Claude.",
  },
  {
    q: "¿Funciona con verificación en dos pasos?",
    a: "Sí. Al conectar te pedirá el código de tu aplicación de autenticación. Si tienes varias cuentas de ActiveCollab, eliges cuál usar.",
  },
  {
    q: "¿Claude puede borrar cosas?",
    a: "Claude actúa con tus permisos, así que puede hacer lo mismo que tú. Tiene instrucciones de pedirte confirmación antes de borrar o mover algo a la papelera.",
  },
  {
    q: "¿Cómo desconecto el acceso?",
    a: "Desconecta o elimina el conector en los ajustes de Claude. Claude deja de tener acceso al momento.",
  },
  {
    q: "¿Es oficial de ActiveCollab?",
    a: "No. Es un servicio independiente, no afiliado ni respaldado por ActiveCollab. El código es abierto y puedes desplegar tu propia copia.",
  },
];

function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-wide text-violet-600 uppercase dark:text-violet-400">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
        {intro && <p className="mt-4 text-lg text-pretty text-zinc-600 dark:text-zinc-400">{intro}</p>}
      </div>
      <div className="mt-12">{children}</div>
    </section>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="relative flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-semibold text-white">{n}</span>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold">{title}</h3>
        <div className="mt-1 text-zinc-600 dark:text-zinc-400">{children}</div>
      </div>
    </li>
  );
}

function ChatPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-violet-500/20 via-fuchsia-400/10 to-sky-400/20 blur-2xl" />
      <div className="rounded-2xl border border-zinc-200 bg-white/80 p-4 shadow-xl backdrop-blur sm:p-5 dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="flex items-center gap-2 border-b border-zinc-100 pb-3 text-xs text-zinc-500 dark:border-zinc-800">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          ActiveCollab conectado
        </div>
        <div className="mt-4 flex justify-end">
          <p className="max-w-[85%] rounded-2xl rounded-br-md bg-violet-600 px-4 py-2.5 text-sm text-white">
            ¿Qué tareas tengo para esta semana?
          </p>
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <p className="text-zinc-700 dark:text-zinc-300">Tienes 3 tareas que vencen esta semana:</p>
          {[
            ["Revisar maqueta home", "Web", "Mié"],
            ["Informe de horas", "Interno", "Jue"],
            ["Reunión de cierre", "Cliente ACME", "Vie"],
          ].map(([task, project, day]) => (
            <div
              key={task}
              className="flex items-center justify-between gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-zinc-800 dark:text-zinc-200">{task}</p>
                <p className="text-xs text-zinc-500">{project}</p>
              </div>
              <span className="shrink-0 rounded-md bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function JsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: site.name,
      description: site.description,
      url: publicUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "es",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@type": "Person", name: site.ownerName, email: site.contactEmail },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
  return (
    <script
      type="application/ld+json"
      // El JSON se escapa para que no pueda cerrar la etiqueta <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium text-white shadow-sm shadow-violet-600/20 transition-all hover:bg-violet-500 hover:shadow-md active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500";
const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 font-medium text-zinc-800 transition-all hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800";

export default function Home() {
  return (
    <main className="text-zinc-900 dark:text-zinc-100">
      <JsonLd />

      {/* Portada */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_50%_-10%,rgb(139_92_246/0.18),transparent)] dark:bg-[radial-gradient(60rem_30rem_at_50%_-10%,rgb(139_92_246/0.25),transparent)]" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pt-14 pb-16 sm:px-6 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:pb-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-900 dark:bg-violet-950/60 dark:text-violet-300">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
              Conector MCP · Gratis
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Usa{" "}
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-fuchsia-400">
                ActiveCollab
              </span>{" "}
              desde Claude
            </h1>
            <p className="mt-5 max-w-xl text-lg text-pretty text-zinc-600 sm:text-xl dark:text-zinc-400">
              Revisa tareas, crea proyectos, registra horas y consulta facturas hablando con Claude. Con tu cuenta y tus
              permisos, sin instalar nada.
            </p>
            <div className="mt-8 max-w-xl">
              <p className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">URL del conector</p>
              <CopyField value={mcpUrl} label="URL del conector MCP" />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="#conectar" className={btnPrimary}>
                Cómo conectarlo
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a href={site.repoUrl} className={btnSecondary}>
                <GithubIcon className="h-4 w-4" />
                Código abierto
              </a>
            </div>
          </div>
          <div className="animate-fade-up [animation-delay:120ms]">
            <ChatPreview />
          </div>
        </div>
      </div>

      {/* Conectar */}
      <div className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <Section id="conectar" eyebrow="En 1 minuto" title="Conéctalo a tu Claude" intro="Pegas la URL, inicias sesión con ActiveCollab y listo.">
          <div className="mx-auto max-w-3xl">
            <Tabs
              tabs={[
                {
                  id: "claude",
                  label: "Claude (web, escritorio, móvil)",
                  content: (
                    <ol className="grid gap-4">
                      <Step n={1} title="Abre los conectores">
                        En Claude ve a <strong>Ajustes → Conectores → Agregar conector personalizado</strong>.
                      </Step>
                      <Step n={2} title="Pega la URL">
                        <span className="mb-3 block">
                          Ponle de nombre <strong>ActiveCollab</strong> y pega:
                        </span>
                        <CopyField value={mcpUrl} label="URL del conector MCP" />
                      </Step>
                      <Step n={3} title="Inicia sesión">
                        Pulsa <strong>Conectar</strong> y entra con tu email y contraseña de ActiveCollab. Funciona con
                        verificación en dos pasos.
                      </Step>
                      <Step n={4} title="Pregunta lo que necesites">
                        Activa el conector en un chat y pide, por ejemplo: “¿Qué tareas tengo pendientes?”.
                      </Step>
                    </ol>
                  ),
                },
                {
                  id: "code",
                  label: "Claude Code",
                  content: (
                    <ol className="grid gap-4">
                      <Step n={1} title="Agrega el servidor">
                        <span className="mb-3 block">En tu terminal:</span>
                        <CopyField value={`claude mcp add --transport http activecollab ${mcpUrl}`} label="Comando de Claude Code" />
                      </Step>
                      <Step n={2} title="Autentícate">
                        Dentro de Claude Code ejecuta <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-800">/mcp</code>,
                        elige <strong>activecollab</strong> y pulsa <strong>Authenticate</strong>.
                      </Step>
                    </ol>
                  ),
                },
              ]}
            />
          </div>
        </Section>
      </div>

      {/* Funciones */}
      <Section id="funciones" eyebrow="Funciones" title="Todo ActiveCollab, desde el chat" intro="Claude entiende lo que pides y elige la acción correcta.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: I, title, text }) => (
            <div
              key={title}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-violet-800"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700 transition-colors group-hover:bg-violet-600 group-hover:text-white dark:bg-violet-950 dark:text-violet-300">
                <I className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-center text-sm font-semibold text-zinc-500">Prueba a pedirle</h3>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {PROMPTS.map((p) => (
              <li
                key={p}
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Seguridad */}
      <div className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <Section id="seguridad" eyebrow="Seguridad" title="Tu cuenta, tus permisos" intro="Diseñado para que tus datos de ActiveCollab no se queden en ningún sitio.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SECURITY.map(({ icon: I, title, text }) => (
              <div key={title} className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                <I className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-zinc-500">
            Detalles en la{" "}
            <Link href="/privacidad" className="font-medium text-violet-600 underline-offset-4 hover:underline dark:text-violet-400">
              política de privacidad
            </Link>
            .
          </p>
        </Section>
      </div>

      {/* Preguntas */}
      <Section id="preguntas" eyebrow="Preguntas" title="Preguntas frecuentes">
        <div className="mx-auto max-w-3xl divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-950">
          {FAQ.map((f) => (
            <details key={f.q} className="group px-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium transition-colors hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-violet-500 dark:hover:text-violet-400">
                {f.q}
                <ChevronIcon className="chevron h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200" />
              </summary>
              <p className="animate-fade-in pb-5 text-zinc-600 dark:text-zinc-400">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Servidor propio */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-8 text-white sm:p-12">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <ServerIcon className="h-8 w-8 text-white/80" />
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">¿Prefieres tu propio servidor?</h2>
              <p className="mt-2 text-white/85">
                Despliega tu copia en Vercel en minutos, limitada a las cuentas de tu empresa. El código es abierto.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={deployUrl}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-violet-700 transition-all hover:bg-violet-50 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Desplegar en Vercel
              </a>
              <a
                href={`${site.repoUrl}#desplegar-tu-propio-servidor`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/40 px-5 py-3 font-medium text-white transition-all hover:bg-white/10 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Ver la guía
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
