import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  accountBaseUrl,
  acRequest,
  ActiveCollabError,
  currentCredentials,
  getConfig,
  type HttpMethod,
  runWithCredentials,
} from "@/lib/activecollab/client";
import { docsSource, endpoints, getPage, pages, searchDocs } from "@/lib/activecollab/docs";

const MAX_OUTPUT_CHARS = 90_000;

type Json = Record<string, unknown>;

// ---------- utilidades de salida ----------

function text(value: unknown) {
  let out = typeof value === "string" ? value : JSON.stringify(value, null, 2);
  if (out.length > MAX_OUTPUT_CHARS) {
    out =
      out.slice(0, MAX_OUTPUT_CHARS) +
      `\n\n[Respuesta recortada: ${out.length} caracteres en total. Usa filtros, paginación (?page=N) o un endpoint más específico.]`;
  }
  return { content: [{ type: "text" as const, text: out }] };
}

function fail(err: unknown) {
  const e = err as ActiveCollabError;
  const details = e?.details ? `\n\nDetalle:\n${JSON.stringify(e.details, null, 2).slice(0, 4000)}` : "";
  return {
    isError: true,
    content: [{ type: "text" as const, text: `${e?.message || String(err)}${details}` }],
  };
}

async function run(fn: () => Promise<unknown>) {
  try {
    return text(await fn());
  } catch (err) {
    return fail(err);
  }
}

/** Convierte timestamps unix de los campos *_on a fecha ISO para que se lean mejor. */
function readableDates(obj: Json): Json {
  const out: Json = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = /_on$/.test(k) && typeof v === "number" && v > 0 ? new Date(v * 1000).toISOString() : v;
  }
  return out;
}

function pick(obj: unknown, keys: string[]): Json {
  if (!obj || typeof obj !== "object") return {};
  const o = obj as Json;
  return readableDates(Object.fromEntries(keys.filter((k) => k in o).map((k) => [k, o[k]])));
}

const asArray = (v: unknown): unknown[] => (Array.isArray(v) ? v : v && typeof v === "object" ? Object.values(v) : []);

const PROJECT_KEYS = ["id", "name", "company_id", "leader_id", "category_id", "label_id", "members", "is_completed", "completed_on", "is_trashed", "created_on", "updated_on", "url_path"];
const TASK_KEYS = ["id", "task_number", "name", "project_id", "task_list_id", "assignee_id", "is_completed", "completed_on", "is_important", "start_on", "due_on", "estimate", "labels", "total_subtasks", "open_subtasks", "comments_count", "url_path"];
const USER_KEYS = ["id", "class", "display_name", "first_name", "last_name", "email", "title", "company_id", "is_archived", "is_trashed"];

async function currentUserId(): Promise<number | undefined> {
  const session = await acRequest<Json>("GET", "/user-session");
  const uid = Number(session?.logged_user_id);
  return uid > 0 ? uid : undefined;
}

function clean<T extends Json>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;
}

// ---------- esquemas comunes ----------

const id = z.number().int().positive();
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD");

const READ = { readOnlyHint: true, destructiveHint: false, openWorldHint: true } as const;
const WRITE = { readOnlyHint: false, destructiveHint: false, openWorldHint: true } as const;
const DESTRUCTIVE = { readOnlyHint: false, destructiveHint: true, openWorldHint: true } as const;

export const SERVER_INSTRUCTIONS = `Servidor MCP para ActiveCollab (gestión de proyectos).
- Para tareas comunes usa las herramientas específicas (listar proyectos, tareas, crear tareas, registrar horas, etc.).
- Para cualquier otra cosa: 1) search_api_docs para encontrar el endpoint, 2) get_api_doc_page para ver ejemplos de payload, 3) activecollab_api_request para llamarlo.
- Los IDs de proyectos, tareas y usuarios son numéricos. Si no los conoces, búscalos primero (list_projects, list_users, search).
- Las fechas de entrada van en formato YYYY-MM-DD. Las horas son decimales (1.5 = 1 h 30 min).
- Antes de borrar o mover algo a la papelera, confirma con el usuario.`;

// ---------- registro ----------

/**
 * Cada herramienta se ejecuta con las credenciales de quien la llama, tomadas del token OAuth
 * validado (extra.authInfo). Así nunca se mezclan cuentas entre personas.
 */
function withUserCredentials(server: McpServer): McpServer {
  const original = server.registerTool.bind(server);
  const wrapped = ((name: string, config: unknown, cb: (...a: unknown[]) => unknown) =>
    original(name, config as never, ((...args: unknown[]) => {
      const extra = args[args.length - 1] as { authInfo?: { extra?: Record<string, unknown> } } | undefined;
      const info = extra?.authInfo?.extra;
      if (!info?.acct || !info?.act) return fail(new ActiveCollabError("Sesión no válida. Vuelve a conectar el conector en Claude."));
      return runWithCredentials({ accountId: String(info.acct), token: String(info.act), email: String(info.em ?? "") }, () =>
        cb(...args),
      );
    }) as never)) as McpServer["registerTool"];
  return Object.assign(Object.create(server), { registerTool: wrapped });
}

export function registerTools(baseServer: McpServer) {
  const server = withUserCredentials(baseServer);
  // ===== Documentación =====

  server.registerTool(
    "search_api_docs",
    {
      title: "Buscar en la documentación de la API",
      description:
        "Busca en la documentación oficial de la API de ActiveCollab (incluida en este servidor). Devuelve endpoints (método, ruta, campos del payload) y páginas de documentación relacionadas. Úsala antes de activecollab_api_request cuando no sepas qué endpoint usar. Acepta términos en español o inglés.",
      inputSchema: {
        query: z.string().min(1).describe("Qué quieres hacer o buscar, p. ej. 'registrar horas en tarea' o 'invoices'"),
        limit: z.number().int().min(1).max(40).optional().describe("Máximo de endpoints (por defecto 12)"),
      },
      annotations: { ...READ, openWorldHint: false },
    },
    async ({ query, limit }) => text(searchDocs(query, limit ?? 12)),
  );

  server.registerTool(
    "get_api_doc_page",
    {
      title: "Leer una página de la documentación",
      description:
        "Devuelve una página completa de la documentación de ActiveCollab en markdown, con ejemplos reales de peticiones, payloads y respuestas. El slug sale de search_api_docs (p. ej. 'projects/elements/tasks/tasks'). Sin slug devuelve el índice de páginas.",
      inputSchema: {
        slug: z.string().optional().describe("Slug de la página, p. ej. 'projects/elements/time-records/time-records'"),
      },
      annotations: { ...READ, openWorldHint: false },
    },
    async ({ slug }) => {
      if (!slug) {
        return text({
          source: docsSource,
          pages: pages.map((p) => ({ slug: p.slug, title: p.title })),
        });
      }
      const page = getPage(slug);
      if (!page) return fail(new Error(`No existe la página '${slug}'. Llama sin slug para ver el índice.`));
      return text(page.markdown);
    },
  );

  server.registerTool(
    "list_api_endpoints",
    {
      title: "Listar endpoints de la API",
      description:
        "Lista los endpoints documentados de ActiveCollab (método y ruta). Filtra opcionalmente por texto en la ruta (p. ej. 'tasks', 'invoices') o por método.",
      inputSchema: {
        contains: z.string().optional().describe("Texto que debe aparecer en la ruta"),
        method: z.enum(["GET", "POST", "PUT", "DELETE"]).optional(),
      },
      annotations: { ...READ, openWorldHint: false },
    },
    async ({ contains, method }) => {
      const list = endpoints
        .filter((e) => (!contains || e.path.toLowerCase().includes(contains.toLowerCase())) && (!method || e.method === method))
        .map((e) => `${e.method} ${e.path}${e.payload_fields.length ? `  {${e.payload_fields.join(", ")}}` : ""}`);
      return text(`${list.length} endpoints\n` + list.join("\n"));
    },
  );

  // ===== Llamada genérica =====

  server.registerTool(
    "activecollab_api_request",
    {
      title: "Llamar a la API de ActiveCollab",
      description:
        "Hace cualquier petición a la API v1 de ActiveCollab de la cuenta configurada. Da acceso a TODAS las funciones (facturas, presupuestos, equipos, archivos, reportes, papelera…). La ruta es relativa a /api/v1, p. ej. '/projects/12/tasks'. Si no conoces el endpoint, usa antes search_api_docs. Pide confirmación al usuario antes de DELETE o de mover a la papelera.",
      inputSchema: {
        method: z.enum(["GET", "POST", "PUT", "DELETE"]),
        path: z.string().min(1).describe("Ruta relativa a /api/v1, p. ej. '/projects/12/tasks/34'"),
        query: z
          .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
          .optional()
          .describe("Parámetros de query, p. ej. { \"q\": \"diseño\", \"page\": 2 }"),
        body: z.record(z.string(), z.unknown()).optional().describe("Payload JSON para POST/PUT/DELETE"),
      },
      annotations: DESTRUCTIVE,
    },
    async ({ method, path, query, body }) => run(() => acRequest(method as HttpMethod, path, { query, body })),
  );

  // ===== Sesión y personas =====

  server.registerTool(
    "whoami",
    {
      title: "Usuario conectado",
      description: "Muestra con qué usuario y cuenta de ActiveCollab está conectado este servidor.",
      inputSchema: {},
      annotations: READ,
    },
    async () =>
      run(async () => {
        const creds = currentCredentials();
        const uid = await currentUserId();
        const user = uid ? await acRequest<Json>("GET", `/users/${uid}`) : null;
        return {
          account_id: creds.accountId,
          account_url: accountBaseUrl(creds.accountId),
          read_only: getConfig().readOnly,
          user: pick(user?.single ?? user, USER_KEYS),
        };
      }),
  );

  server.registerTool(
    "list_users",
    {
      title: "Listar usuarios",
      description: "Lista los usuarios de ActiveCollab (id, nombre, email, rol, empresa). Útil para encontrar el assignee_id o user_id.",
      inputSchema: {
        include_archived: z.boolean().optional().describe("Incluir usuarios archivados (usa /users/all)"),
      },
      annotations: READ,
    },
    async ({ include_archived }) =>
      run(async () => asArray(await acRequest("GET", include_archived ? "/users/all" : "/users")).map((u) => pick(u, USER_KEYS))),
  );

  server.registerTool(
    "list_companies",
    {
      title: "Listar empresas / clientes",
      description: "Lista las empresas (clientes) registradas en ActiveCollab.",
      inputSchema: {},
      annotations: READ,
    },
    async () =>
      run(async () =>
        asArray(await acRequest("GET", "/companies")).map((c) => pick(c, ["id", "name", "is_owner", "is_archived", "address", "phone", "homepage_url"])),
      ),
  );

  // ===== Proyectos =====

  server.registerTool(
    "list_projects",
    {
      title: "Listar proyectos",
      description: "Lista los proyectos activos (o los archivados/completados) con sus datos principales.",
      inputSchema: {
        archived: z.boolean().optional().describe("true para proyectos completados/archivados"),
        page: z.number().int().positive().optional().describe("Página (solo para archivados)"),
      },
      annotations: READ,
    },
    async ({ archived, page }) =>
      run(async () =>
        asArray(await acRequest("GET", archived ? "/projects/archive" : "/projects", { query: { page } })).map((p) => pick(p, PROJECT_KEYS)),
      ),
  );

  server.registerTool(
    "get_project",
    {
      title: "Ver proyecto",
      description: "Devuelve el detalle de un proyecto.",
      inputSchema: { project_id: id },
      annotations: READ,
    },
    async ({ project_id }) => run(() => acRequest("GET", `/projects/${project_id}`)),
  );

  server.registerTool(
    "create_project",
    {
      title: "Crear proyecto",
      description: "Crea un proyecto nuevo en ActiveCollab.",
      inputSchema: {
        name: z.string().min(1),
        body: z.string().optional().describe("Descripción (admite HTML)"),
        company_id: id.optional().describe("Empresa cliente"),
        leader_id: id.optional().describe("Usuario líder del proyecto"),
        members: z.array(id).optional().describe("IDs de usuarios miembros"),
        category_id: id.optional(),
        label_id: id.optional(),
        template_id: id.optional().describe("Crear a partir de una plantilla de proyecto"),
        is_tracking_enabled: z.boolean().optional(),
      },
      annotations: WRITE,
    },
    async (args) => run(() => acRequest("POST", "/projects", { body: clean(args) })),
  );

  server.registerTool(
    "update_project",
    {
      title: "Editar proyecto",
      description: "Actualiza campos de un proyecto (nombre, descripción, líder, empresa, categoría, etiqueta…).",
      inputSchema: {
        project_id: id,
        fields: z.record(z.string(), z.unknown()).describe("Campos a cambiar, p. ej. { \"name\": \"Nuevo nombre\", \"leader_id\": 3 }"),
      },
      annotations: WRITE,
    },
    async ({ project_id, fields }) => run(() => acRequest("PUT", `/projects/${project_id}`, { body: fields })),
  );

  // ===== Listas de tareas =====

  server.registerTool(
    "list_task_lists",
    {
      title: "Listar listas de tareas",
      description: "Lista las listas de tareas (columnas/grupos) de un proyecto.",
      inputSchema: { project_id: id },
      annotations: READ,
    },
    async ({ project_id }) =>
      run(async () =>
        asArray(await acRequest("GET", `/projects/${project_id}/task-lists`)).map((l) =>
          pick(l, ["id", "name", "position", "start_on", "due_on", "is_completed", "open_tasks", "completed_tasks"]),
        ),
      ),
  );

  server.registerTool(
    "create_task_list",
    {
      title: "Crear lista de tareas",
      description: "Crea una lista de tareas en un proyecto.",
      inputSchema: { project_id: id, name: z.string().min(1), start_on: date.optional(), due_on: date.optional() },
      annotations: WRITE,
    },
    async ({ project_id, ...body }) => run(() => acRequest("POST", `/projects/${project_id}/task-lists`, { body: clean(body) })),
  );

  // ===== Tareas =====

  server.registerTool(
    "list_tasks",
    {
      title: "Listar tareas de un proyecto",
      description:
        "Lista las tareas abiertas de un proyecto (o las completadas con completed=true), junto con sus listas de tareas. Se puede filtrar por responsable o lista.",
      inputSchema: {
        project_id: id,
        completed: z.boolean().optional().describe("true para tareas completadas (archivo)"),
        assignee_id: id.optional().describe("Solo tareas de este usuario"),
        task_list_id: id.optional().describe("Solo tareas de esta lista"),
        page: z.number().int().positive().optional().describe("Página (para completadas)"),
      },
      annotations: READ,
    },
    async ({ project_id, completed, assignee_id, task_list_id, page }) =>
      run(async () => {
        const data = await acRequest<Json>("GET", `/projects/${project_id}/tasks${completed ? "/archive" : ""}`, { query: { page } });
        const rawTasks = Array.isArray(data) ? data : asArray(data?.tasks);
        const tasks = rawTasks
          .map((t) => pick(t, TASK_KEYS))
          .filter((t) => (!assignee_id || t.assignee_id === assignee_id) && (!task_list_id || t.task_list_id === task_list_id));
        const lists = asArray((data as Json)?.task_lists).map((l) => pick(l, ["id", "name"]));
        return { count: tasks.length, task_lists: lists, tasks };
      }),
  );

  server.registerTool(
    "list_user_tasks",
    {
      title: "Tareas de un usuario",
      description: "Lista las tareas abiertas asignadas a un usuario en todos los proyectos.",
      inputSchema: { user_id: id },
      annotations: READ,
    },
    async ({ user_id }) =>
      run(async () => {
        const data = await acRequest<Json>("GET", `/users/${user_id}/tasks`);
        const tasks = asArray(data?.tasks ?? data).map((t) => pick(t, TASK_KEYS));
        const subtasks = asArray(data?.subtasks).map((s) =>
          pick(s, ["id", "task_id", "body", "assignee_id", "is_completed", "due_on", "url_path"]),
        );
        const projects = asArray((data?.related as Json)?.Project).map((p) => pick(p, ["id", "name"]));
        return { count: tasks.length, projects, tasks, subtasks };
      }),
  );

  server.registerTool(
    "get_task",
    {
      title: "Ver tarea",
      description: "Devuelve el detalle completo de una tarea: descripción, subtareas, comentarios, suscriptores, tiempo registrado.",
      inputSchema: { project_id: id, task_id: id },
      annotations: READ,
    },
    async ({ project_id, task_id }) => run(() => acRequest("GET", `/projects/${project_id}/tasks/${task_id}`)),
  );

  const taskFields = {
    body: z.string().optional().describe("Descripción (admite HTML)"),
    assignee_id: id.optional().describe("Usuario responsable"),
    task_list_id: id.optional(),
    start_on: date.optional(),
    due_on: date.optional(),
    is_important: z.boolean().optional(),
    is_hidden_from_clients: z.boolean().optional(),
    labels: z.array(z.string()).optional().describe("Nombres de etiquetas"),
    estimate: z.number().nonnegative().optional().describe("Estimación en horas"),
    job_type_id: id.optional(),
    subscribers: z.array(id).optional().describe("IDs de usuarios suscritos"),
  };

  server.registerTool(
    "create_task",
    {
      title: "Crear tarea",
      description: "Crea una tarea en un proyecto.",
      inputSchema: { project_id: id, name: z.string().min(1), ...taskFields },
      annotations: WRITE,
    },
    async ({ project_id, ...body }) => run(() => acRequest("POST", `/projects/${project_id}/tasks`, { body: clean(body) })),
  );

  server.registerTool(
    "update_task",
    {
      title: "Editar tarea",
      description: "Actualiza una tarea (nombre, descripción, responsable, fechas, lista, etiquetas, estimación…). Solo envía los campos que quieras cambiar.",
      inputSchema: { project_id: id, task_id: id, name: z.string().min(1).optional(), ...taskFields },
      annotations: WRITE,
    },
    async ({ project_id, task_id, ...body }) =>
      run(() => acRequest("PUT", `/projects/${project_id}/tasks/${task_id}`, { body: clean(body) })),
  );

  server.registerTool(
    "complete_task",
    {
      title: "Completar o reabrir tarea",
      description: "Marca una tarea como completada, o la reabre con reopen=true.",
      inputSchema: { task_id: id, reopen: z.boolean().optional() },
      annotations: WRITE,
    },
    async ({ task_id, reopen }) => run(() => acRequest("PUT", `/${reopen ? "open" : "complete"}/task/${task_id}`)),
  );

  server.registerTool(
    "add_subtask",
    {
      title: "Agregar subtarea",
      description: "Agrega una subtarea a una tarea.",
      inputSchema: {
        project_id: id,
        task_id: id,
        body: z.string().min(1).describe("Texto de la subtarea"),
        assignee_id: id.optional(),
        due_on: date.optional(),
      },
      annotations: WRITE,
    },
    async ({ project_id, task_id, ...body }) =>
      run(() => acRequest("POST", `/projects/${project_id}/tasks/${task_id}/subtasks`, { body: clean(body) })),
  );

  server.registerTool(
    "complete_subtask",
    {
      title: "Completar o reabrir subtarea",
      description: "Marca una subtarea como completada, o la reabre con reopen=true.",
      inputSchema: { subtask_id: id, reopen: z.boolean().optional() },
      annotations: WRITE,
    },
    async ({ subtask_id, reopen }) => run(() => acRequest("PUT", `/${reopen ? "open" : "complete"}/subtask/${subtask_id}`)),
  );

  // ===== Comentarios =====

  server.registerTool(
    "add_comment",
    {
      title: "Comentar",
      description: "Agrega un comentario a una tarea, discusión o nota.",
      inputSchema: {
        parent_type: z.enum(["task", "discussion", "note"]),
        parent_id: id,
        body: z.string().min(1).describe("Texto del comentario (admite HTML)"),
      },
      annotations: WRITE,
    },
    async ({ parent_type, parent_id, body }) => run(() => acRequest("POST", `/comments/${parent_type}/${parent_id}`, { body: { body } })),
  );

  // ===== Discusiones y notas =====

  server.registerTool(
    "list_discussions",
    {
      title: "Listar discusiones",
      description: "Lista las discusiones de un proyecto.",
      inputSchema: { project_id: id },
      annotations: READ,
    },
    async ({ project_id }) => run(() => acRequest("GET", `/projects/${project_id}/discussions`)),
  );

  server.registerTool(
    "create_discussion",
    {
      title: "Crear discusión",
      description: "Inicia una discusión en un proyecto.",
      inputSchema: {
        project_id: id,
        name: z.string().min(1),
        body: z.string().min(1),
        is_hidden_from_clients: z.boolean().optional(),
      },
      annotations: WRITE,
    },
    async ({ project_id, ...body }) => run(() => acRequest("POST", `/projects/${project_id}/discussions`, { body: clean(body) })),
  );

  server.registerTool(
    "list_notes",
    {
      title: "Listar notas",
      description: "Lista las notas de un proyecto.",
      inputSchema: { project_id: id },
      annotations: READ,
    },
    async ({ project_id }) => run(() => acRequest("GET", `/projects/${project_id}/notes`)),
  );

  server.registerTool(
    "create_note",
    {
      title: "Crear nota",
      description: "Crea una nota en un proyecto (opcionalmente dentro de otra nota/colección).",
      inputSchema: {
        project_id: id,
        name: z.string().min(1),
        body: z.string().min(1).describe("Contenido (admite HTML)"),
        note_id: id.optional().describe("Nota padre / colección"),
        is_hidden_from_clients: z.boolean().optional(),
      },
      annotations: WRITE,
    },
    async ({ project_id, ...body }) => run(() => acRequest("POST", `/projects/${project_id}/notes`, { body: clean(body) })),
  );

  // ===== Tiempo y gastos =====

  server.registerTool(
    "list_job_types",
    {
      title: "Listar tipos de trabajo",
      description: "Lista los tipos de trabajo (job types) con su tarifa por hora. Se necesitan para registrar horas.",
      inputSchema: {},
      annotations: READ,
    },
    async () => run(() => acRequest("GET", "/job-types")),
  );

  server.registerTool(
    "log_time",
    {
      title: "Registrar horas",
      description:
        "Registra tiempo trabajado en un proyecto (y opcionalmente en una tarea). Si no indicas job_type_id se usa el tipo de trabajo por defecto. billable_status: 0 no facturable, 1 facturable.",
      inputSchema: {
        project_id: id,
        value: z.number().positive().describe("Horas en decimal, p. ej. 1.5"),
        record_date: date.describe("Fecha del trabajo"),
        user_id: id.optional().describe("Por defecto, el usuario conectado"),
        task_id: id.optional(),
        job_type_id: id.optional(),
        summary: z.string().optional().describe("Descripción del trabajo"),
        billable_status: z.number().int().min(0).max(3).optional(),
      },
      annotations: WRITE,
    },
    async ({ project_id, ...input }) =>
      run(async () => {
        const body: Json = clean({ ...input });
        if (!body.user_id) body.user_id = await currentUserId();
        if (!body.job_type_id) {
          const def = await acRequest<Json>("GET", "/job-types/default").catch(() => null);
          if (def?.id) body.job_type_id = def.id;
        }
        return acRequest("POST", `/projects/${project_id}/time-records`, { body });
      }),
  );

  server.registerTool(
    "list_time_records",
    {
      title: "Consultar horas registradas",
      description:
        "Lista registros de tiempo de un proyecto o de un usuario. Con from/to filtra por rango de fechas.",
      inputSchema: {
        project_id: id.optional().describe("Horas de este proyecto"),
        user_id: id.optional().describe("Horas de este usuario (si no hay project_id)"),
        from: date.optional(),
        to: date.optional(),
      },
      annotations: READ,
    },
    async ({ project_id, user_id, from, to }) =>
      run(async () => {
        if (!project_id && !user_id) throw new Error("Indica project_id o user_id.");
        const base = project_id ? `/projects/${project_id}/time-records` : `/users/${user_id}/time-records`;
        const filtered = from || to;
        return acRequest("GET", filtered ? `${base}/filtered-by-date` : base, { query: filtered ? { from, to } : undefined });
      }),
  );

  server.registerTool(
    "log_expense",
    {
      title: "Registrar gasto",
      description: "Registra un gasto en un proyecto (y opcionalmente en una tarea).",
      inputSchema: {
        project_id: id,
        value: z.number().positive().describe("Importe"),
        record_date: date,
        category_id: id.optional().describe("Categoría de gasto (GET /expense-categories)"),
        user_id: id.optional(),
        task_id: id.optional(),
        summary: z.string().optional(),
        billable_status: z.number().int().min(0).max(3).optional(),
      },
      annotations: WRITE,
    },
    async ({ project_id, ...input }) =>
      run(async () => {
        const body: Json = clean({ ...input });
        if (!body.user_id) body.user_id = await currentUserId();
        if (!body.category_id) {
          const def = await acRequest<Json>("GET", "/expense-categories/default").catch(() => null);
          if (def?.id) body.category_id = def.id;
        }
        return acRequest("POST", `/projects/${project_id}/expenses`, { body });
      }),
  );

  // ===== Búsqueda y etiquetas =====

  server.registerTool(
    "search",
    {
      title: "Buscar en ActiveCollab",
      description: "Busca proyectos, tareas, discusiones, notas, archivos, usuarios y empresas por texto.",
      inputSchema: {
        q: z.string().min(1),
        project_id: id.optional().describe("Limitar a un proyecto"),
      },
      annotations: READ,
    },
    async ({ q, project_id }) => run(() => acRequest("GET", "/search", { query: { q, project_id } })),
  );

  server.registerTool(
    "list_labels",
    {
      title: "Listar etiquetas",
      description: "Lista las etiquetas disponibles (de tareas o de proyectos).",
      inputSchema: { kind: z.enum(["task", "project", "all"]).optional() },
      annotations: READ,
    },
    async ({ kind }) =>
      run(() => acRequest("GET", kind === "task" ? "/labels/task-labels" : kind === "project" ? "/labels/project-labels" : "/labels")),
  );

  // ===== Papelera =====

  server.registerTool(
    "move_to_trash",
    {
      title: "Mover a la papelera",
      description:
        "Mueve un elemento a la papelera de ActiveCollab (se puede restaurar). Confirma con el usuario antes de usarla.",
      inputSchema: {
        type: z.enum(["task", "task-list", "project", "discussion", "note", "comment", "file", "time-record", "expense", "subtask"]),
        id,
      },
      annotations: DESTRUCTIVE,
    },
    async ({ type, id: itemId }) => run(() => acRequest("PUT", `/move-to-trash/${type}/${itemId}`)),
  );
}
