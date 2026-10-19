# ActiveCollab MCP

Servidor MCP que conecta **Claude** con **ActiveCollab**. Se despliega en Vercel y se agrega en Claude como conector personalizado. Desde el chat, Claude puede consultar y gestionar proyectos, tareas, horas, comentarios, facturas y cualquier otra función de la API.

El repo incluye la **documentación completa de la API de ActiveCollab** (124 páginas, 275 endpoints) en [`docs/activecollab-api`](docs/activecollab-api/README.md). Claude la consulta para saber qué endpoint usar en cada caso.

## Cómo funciona

```
Claude (chat)  ──MCP──▶  Vercel: /api/mcp/<clave>  ──API v1──▶  app.activecollab.com/<cuenta>
```

Claude tiene tres tipos de herramientas:

| Tipo | Herramientas |
|---|---|
| **Uso diario** | `whoami`, `list_projects`, `get_project`, `create_project`, `update_project`, `list_task_lists`, `create_task_list`, `list_tasks`, `list_user_tasks`, `get_task`, `create_task`, `update_task`, `complete_task`, `add_subtask`, `complete_subtask`, `add_comment`, `list_discussions`, `create_discussion`, `list_notes`, `create_note`, `list_job_types`, `log_time`, `list_time_records`, `log_expense`, `search`, `list_users`, `list_companies`, `list_labels`, `move_to_trash` |
| **Documentación** | `search_api_docs` (busca endpoints, también en español), `get_api_doc_page` (ejemplos reales de cada endpoint), `list_api_endpoints` |
| **Acceso total** | `activecollab_api_request`: llama a cualquier endpoint (facturas, presupuestos, equipos, reportes, papelera…) |

## Puesta en marcha

### 1. Obtén tu token de ActiveCollab

Necesitas Node.js 20 o superior en tu computadora:

```bash
git clone https://github.com/amadevss/activecolabmcp.git
cd activecolabmcp
npm install
npm run get-token
```

El script te pide tu email y tu contraseña de ActiveCollab, y el código de verificación en dos pasos si lo tienes activado. Al terminar muestra:

```
ACTIVECOLLAB_ACCOUNT_ID=123456
ACTIVECOLLAB_TOKEN=xx-xxxxxxxxxxxxxxxx
```

> Claude actuará con los permisos del usuario con el que generes el token. Si quieres limitar lo que puede ver o hacer, crea un usuario dedicado en ActiveCollab con los permisos adecuados.

### 2. Genera una clave secreta para el servidor

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
```

Guárdala: es tu `MCP_SECRET`. Con ella nadie más puede usar tu servidor.

### 3. Despliega en Vercel

1. En [vercel.com/new](https://vercel.com/new) importa este repositorio. Vercel detecta Next.js solo.
2. En **Settings → Environment Variables** agrega:

| Variable | Valor |
|---|---|
| `MCP_SECRET` | la clave del paso 2 |
| `ACTIVECOLLAB_ACCOUNT_ID` | el ID del paso 1 |
| `ACTIVECOLLAB_TOKEN` | el token del paso 1 |
| `ACTIVECOLLAB_READ_ONLY` | *(opcional)* `true` para que Claude solo pueda leer |

3. Vuelve a desplegar (**Deployments → Redeploy**) para que tome las variables.
4. Abre `https://<tu-app>.vercel.app`: debe aparecer la página "ActiveCollab MCP".

> Usa el dominio de producción (`<tu-app>.vercel.app`). Las URLs de preview suelen estar protegidas por Vercel y Claude no puede entrar.

### 4. Conéctalo en Claude

**Claude (web, escritorio y móvil):**
1. **Ajustes → Conectores → Agregar conector personalizado**.
2. Nombre: `ActiveCollab`. URL:
   ```
   https://<tu-app>.vercel.app/api/mcp/<MCP_SECRET>
   ```
3. En un chat nuevo, activa el conector desde el menú de herramientas.

**Claude Code** (la clave va en una cabecera):
```bash
claude mcp add --transport http activecollab https://<tu-app>.vercel.app/api/mcp \
  --header "Authorization: Bearer <MCP_SECRET>"
```

### 5. Pruébalo

- "¿Con qué usuario estás conectado a ActiveCollab?"
- "Lista mis proyectos activos"
- "¿Qué tareas tengo pendientes y cuáles vencen esta semana?"
- "Crea una tarea 'Revisar maqueta' en el proyecto Web, asignada a Ana, para el viernes"
- "Registra 2,5 horas hoy en la tarea 34 del proyecto Web: reunión con cliente"
- "¿Cuántas horas registró el equipo en el proyecto Web este mes?"
- "Muéstrame las facturas pendientes de pago" *(usa la documentación y la llamada general)*

## Variables de entorno

Ver [`.env.example`](.env.example).

| Variable | Obligatoria | Descripción |
|---|---|---|
| `MCP_SECRET` | Sí | Clave de acceso al servidor (mínimo 16 caracteres) |
| `ACTIVECOLLAB_ACCOUNT_ID` | Sí | ID de la cuenta en la nube |
| `ACTIVECOLLAB_TOKEN` | Sí\* | Token de la API (`npm run get-token`) |
| `ACTIVECOLLAB_EMAIL` / `ACTIVECOLLAB_PASSWORD` | \* | Alternativa al token. No sirve si tienes verificación en dos pasos |
| `ACTIVECOLLAB_READ_ONLY` | No | `true` bloquea todo lo que no sea lectura |
| `ACTIVECOLLAB_BASE_URL` | No | Solo para ActiveCollab instalado en tu propio servidor |

## Desarrollo local

```bash
cp .env.example .env.local   # y complétalo
npm run dev
```

El endpoint queda en `http://localhost:3000/api/mcp/<MCP_SECRET>`. Puedes probarlo con el inspector oficial de MCP:

```bash
npx @modelcontextprotocol/inspector
```

## Actualizar la documentación de la API

La documentación se genera a partir de https://developers.activecollab.com/api-documentation/:

```bash
pip install beautifulsoup4
npm run docs:build
```

Esto regenera `docs/activecollab-api/` (markdown legible) y `lib/activecollab/api-docs.generated.json` (lo que usa el servidor).

## Estructura

```
app/api/mcp/[key]/route.ts      Endpoint MCP con la clave en la URL (conectores de Claude)
app/api/mcp/route.ts            Endpoint MCP con la clave en la cabecera Authorization
lib/mcp/handler.ts              Servidor MCP y validación de la clave
lib/mcp/tools.ts                Herramientas que ve Claude
lib/activecollab/client.ts      Cliente de la API de ActiveCollab (login en la nube y peticiones)
lib/activecollab/docs.ts        Búsqueda en la documentación
docs/activecollab-api/          Documentación de la API en markdown
scripts/get-token.mjs           Obtiene el token de la API
scripts/build-api-docs.py       Regenera la documentación
```

## Seguridad

- No subas tu `.env.local` ni pegues el token o `MCP_SECRET` en sitios públicos. Si se filtran, cambia `MCP_SECRET` en Vercel y genera un token nuevo con `npm run get-token`.
- Claude puede crear, editar y borrar con los permisos del usuario del token. Usa `ACTIVECOLLAB_READ_ONLY=true` o un usuario con menos permisos si prefieres limitarlo.
