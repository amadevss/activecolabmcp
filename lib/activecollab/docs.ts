import apiDocs from "./api-docs.generated.json";

export type DocPage = {
  slug: string;
  title: string;
  section: string;
  url: string;
  markdown: string;
};

export type DocEndpoint = {
  method: string;
  path: string;
  pages: string[];
  example_path: string;
  payload_fields: string[];
  query_fields: string[];
  example_payload: string;
};

export const pages = apiDocs.pages as DocPage[];
export const endpoints = apiDocs.endpoints as DocEndpoint[];
export const docsSource = apiDocs.source as string;

const pageBySlug = new Map(pages.map((p) => [p.slug, p]));

export function getPage(slug: string): DocPage | undefined {
  const clean = slug.trim().replace(/^\/+|\.(md|html)$/g, "").replace(/^v1\//, "");
  return pageBySlug.get(clean);
}

// Sinónimos en español para que Claude encuentre lo correcto aunque pregunte en español.
const SYNONYMS: Record<string, string[]> = {
  tarea: ["task"],
  tareas: ["tasks", "task"],
  subtarea: ["subtask"],
  subtareas: ["subtasks", "subtask"],
  proyecto: ["project"],
  proyectos: ["projects", "project"],
  lista: ["task-list", "list"],
  listas: ["task-lists", "list"],
  comentario: ["comment"],
  comentarios: ["comments", "comment"],
  usuario: ["user"],
  usuarios: ["users", "user"],
  empresa: ["company"],
  empresas: ["companies", "company"],
  cliente: ["client", "company"],
  clientes: ["clients", "companies"],
  equipo: ["team"],
  equipos: ["teams", "team"],
  horas: ["time-records", "time"],
  tiempo: ["time-records", "time"],
  gasto: ["expense"],
  gastos: ["expenses", "expense"],
  factura: ["invoice"],
  facturas: ["invoices", "invoice"],
  presupuesto: ["estimate", "budget"],
  presupuestos: ["estimates", "budget"],
  nota: ["note"],
  notas: ["notes", "note"],
  discusion: ["discussion"],
  discusiones: ["discussions", "discussion"],
  archivo: ["file", "attachment"],
  archivos: ["files", "attachments"],
  etiqueta: ["label"],
  etiquetas: ["labels", "label"],
  buscar: ["search"],
  busqueda: ["search"],
  papelera: ["trash"],
  archivar: ["archive", "move-to-archive"],
  completar: ["complete"],
  reabrir: ["open", "reopen"],
  recordatorio: ["reminder"],
  recordatorios: ["reminders"],
  plantilla: ["template"],
  plantillas: ["templates"],
  reporte: ["report", "reports"],
  reportes: ["reports", "report"],
  informe: ["report"],
  notificaciones: ["notifications"],
  suscriptores: ["subscribers"],
  pagos: ["payments"],
  impuestos: ["tax-rates"],
  moneda: ["currency", "currencies"],
  categorias: ["categories"],
  dias: ["day-offs"],
  vacaciones: ["day-offs"],
  mover: ["move", "move-to-project"],
  copiar: ["copy", "duplicate"],
  eliminar: ["delete", "trash"],
  borrar: ["delete", "trash"],
  crear: ["post", "create"],
  editar: ["put", "update"],
  actualizar: ["put", "update"],
};

function terms(query: string): string[] {
  const base = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .split(/[^a-z0-9\-_{}]+/)
    .filter((t) => t.length > 1);
  return [...new Set(base.flatMap((t) => [t, ...(SYNONYMS[t] || [])]))];
}

export function searchDocs(query: string, limit = 10) {
  const ts = terms(query);
  if (!ts.length) return { endpoints: [], pages: [] };

  const scoredEndpoints = endpoints
    .map((e) => {
      const hay = `${e.method} ${e.path} ${e.payload_fields.join(" ")} ${e.query_fields.join(" ")} ${e.pages.join(" ")}`.toLowerCase();
      let score = 0;
      for (const t of ts) {
        if (e.path.toLowerCase().includes(t)) score += 3;
        else if (hay.includes(t)) score += 1;
        if (e.method.toLowerCase() === t) score += 2;
      }
      return { e, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.e.path.length - b.e.path.length)
    .slice(0, limit)
    .map(({ e }) => ({
      method: e.method,
      path: e.path,
      payload_fields: e.payload_fields,
      query_fields: e.query_fields,
      doc_pages: e.pages.slice(0, 4),
    }));

  const scoredPages = pages
    .map((p) => {
      const title = `${p.title} ${p.slug}`.toLowerCase();
      const body = p.markdown.toLowerCase();
      let score = 0;
      for (const t of ts) {
        if (title.includes(t)) score += 5;
        const hits = body.split(t).length - 1;
        score += Math.min(hits, 10) * 0.3;
      }
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(limit, 8))
    .map(({ p }) => ({ slug: p.slug, title: p.title, section: p.section }));

  return { endpoints: scoredEndpoints, pages: scoredPages };
}
