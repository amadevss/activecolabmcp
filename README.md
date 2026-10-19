# ActiveCollab MCP

Servidor MCP que conecta **Claude** con **ActiveCollab** para todo un equipo. Se despliega una vez en Vercel y cada persona solo tiene que pegar la URL en Claude e iniciar sesión con **su propia cuenta de ActiveCollab**. Claude trabaja con los permisos de esa persona: ve sus proyectos, y lo que crea queda a su nombre.

El repo incluye la **documentación completa de la API de ActiveCollab** (124 páginas, 275 endpoints) en [`docs/activecollab-api`](docs/activecollab-api/README.md). Claude la consulta para saber qué endpoint usar en cada caso.

## Cómo funciona

```
Claude ──MCP + OAuth──▶ Vercel: /api/mcp ──API v1 (token de cada persona)──▶ app.activecollab.com/<cuenta>
```

1. La persona agrega `https://<tu-app>.vercel.app/api/mcp` en Claude y pulsa **Conectar**.
2. Se abre la página de inicio de sesión del servidor. Ahí pone su email y contraseña de ActiveCollab, el código de verificación en dos pasos si lo tiene, y elige la cuenta si tiene varias.
3. El servidor pide a ActiveCollab un token para esa persona y se lo entrega a Claude **cifrado**. No se guarda nada en ninguna base de datos.
4. Desde ese momento, cada acción de Claude usa el token de esa persona.

Claude tiene tres tipos de herramientas:

| Tipo | Herramientas |
|---|---|
| **Uso diario** | `whoami`, `list_projects`, `get_project`, `create_project`, `update_project`, `list_task_lists`, `create_task_list`, `list_tasks`, `list_user_tasks`, `get_task`, `create_task`, `update_task`, `complete_task`, `add_subtask`, `complete_subtask`, `add_comment`, `list_discussions`, `create_discussion`, `list_notes`, `create_note`, `list_job_types`, `log_time`, `list_time_records`, `log_expense`, `search`, `list_users`, `list_companies`, `list_labels`, `move_to_trash` |
| **Documentación** | `search_api_docs` (busca endpoints, también en español), `get_api_doc_page` (ejemplos reales de cada endpoint), `list_api_endpoints` |
| **Acceso total** | `activecollab_api_request`: llama a cualquier endpoint (facturas, presupuestos, equipos, reportes, papelera…) |

## Puesta en marcha (solo la persona que administra, una vez)

### 1. Genera la clave de cifrado

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Guárdala como secreto. Es tu `AUTH_SECRET`.

### 2. Despliega en Vercel

1. En [vercel.com/new](https://vercel.com/new) importa este repositorio. Vercel detecta Next.js solo.
2. En **Settings → Environment Variables** agrega:

| Variable | Valor |
|---|---|
| `AUTH_SECRET` | la clave del paso 1 (obligatoria) |
| `PUBLIC_URL` | `https://<tu-app>.vercel.app` (recomendado) |
| `ACTIVECOLLAB_ALLOWED_ACCOUNT_IDS` | el ID de tu cuenta, p. ej. `123456` (recomendado: solo tu equipo podrá entrar) |
| `ACTIVECOLLAB_READ_ONLY` | *(opcional)* `true` para que Claude solo pueda leer |

3. Vuelve a desplegar (**Deployments → Redeploy**) para que tome las variables.
4. Abre `https://<tu-app>.vercel.app`: debe aparecer la página "ActiveCollab MCP".

> El ID de la cuenta es el número que aparece en la URL cuando entras a ActiveCollab: `app.activecollab.com/123456`.
>
> Usa el dominio de producción. Las URLs de preview suelen estar protegidas por Vercel y Claude no puede entrar.

### 3. Comparte la URL con tu equipo

```
https://<tu-app>.vercel.app/api/mcp
```

## Conectarse (cada persona)

**Claude (web, escritorio y móvil):**
1. **Ajustes → Conectores → Agregar conector personalizado**.
2. Nombre: `ActiveCollab`. URL: `https://<tu-app>.vercel.app/api/mcp`.
3. Pulsa **Conectar** e inicia sesión con tu cuenta de ActiveCollab.
4. En un chat, activa el conector desde el menú de herramientas.

> En planes Team o Enterprise, quien administra la organización en Claude puede agregar el conector una vez para todos. Después, cada persona solo pulsa **Conectar** e inicia sesión.

**Claude Code:**
```bash
claude mcp add --transport http activecollab https://<tu-app>.vercel.app/api/mcp
```
Después ejecuta `/mcp` dentro de Claude Code y elige **Authenticate**.

### Ejemplos

- "¿Con qué usuario estás conectado a ActiveCollab?"
- "¿Qué tareas tengo pendientes y cuáles vencen esta semana?"
- "Crea una tarea 'Revisar maqueta' en el proyecto Web, asignada a Ana, para el viernes"
- "Registra 2,5 horas hoy en la tarea 34 del proyecto Web: reunión con cliente"
- "Muéstrame las facturas pendientes de pago" *(usa la documentación y la llamada general)*

## Seguridad

- **Cada persona usa sus propios permisos** de ActiveCollab. Claude no puede ver ni hacer nada que esa persona no pueda hacer.
- **Contraseñas:** solo se usan en el momento del login para pedir un token a ActiveCollab. No se guardan ni se registran en los logs.
- **Tokens cifrados:** se usa AES-256-GCM con una clave distinta para cada tipo de token, derivada de `AUTH_SECRET`. El token de ActiveCollab nunca viaja en claro. Los access tokens duran 1 hora y los refresh tokens 30 días.
- **Solo clientes de Claude:** el login solo puede devolver a `claude.ai`, `claude.com` o `localhost` (Claude Code y Desktop). Ningún otro sitio puede usar tu servidor para pedir accesos.
- **OAuth 2.1 con PKCE (S256) obligatorio:** los códigos de autorización caducan en 1 minuto y los tokens van ligados a este servidor.
- **Página de login protegida:** cookie anti-CSRF ligada al navegador, comprobación del origen, CSP estricta sin JavaScript, sin iframes y sin caché.
- **Al renovar el acceso** se comprueba que el token de ActiveCollab siga activo. Si se revocó, hay que volver a iniciar sesión.
- **`ACTIVECOLLAB_ALLOWED_ACCOUNT_IDS`** limita el servidor a tu empresa. Sin esta variable, cualquier persona con una cuenta de ActiveCollab podría usar tu servidor (solo con su propia cuenta).
- **Cerrar todas las sesiones:** cambia `AUTH_SECRET` en Vercel y vuelve a desplegar. Todos los tokens dejan de valer.
- **Quitar el acceso a una persona:** desactiva o archiva su usuario en ActiveCollab. ActiveCollab rechaza sus peticiones y la siguiente renovación del acceso falla.
- **Límites:** ActiveCollab aplica sus propios límites a los intentos de login. Si quieres más protección, activa el [Firewall de Vercel](https://vercel.com/docs/vercel-firewall) con límite de peticiones para `/oauth/authorize`.

## Variables de entorno

Ver [`.env.example`](.env.example).

| Variable | Obligatoria | Descripción |
|---|---|---|
| `AUTH_SECRET` | Sí | Clave maestra de cifrado (mínimo 32 caracteres) |
| `PUBLIC_URL` | Recomendada | URL pública del servidor, sin barra final |
| `ACTIVECOLLAB_ALLOWED_ACCOUNT_IDS` | Recomendada | IDs de cuentas permitidas, separados por comas |
| `ACTIVECOLLAB_READ_ONLY` | No | `true` bloquea todo lo que no sea lectura |
| `OAUTH_ALLOWED_REDIRECT_HOSTS` | No | Hosts extra a los que se permite volver tras el login |

## Desarrollo local

```bash
cp .env.example .env.local   # y pon un AUTH_SECRET
npm run dev
```

El endpoint queda en `http://localhost:3000/api/mcp`. Puedes probarlo con el inspector oficial de MCP, que también hace el login OAuth:

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
app/api/mcp/route.ts                     Endpoint MCP (requiere access token OAuth)
app/.well-known/oauth-*/                 Metadatos OAuth (descubrimiento automático)
app/oauth/register/route.ts              Registro dinámico de clientes (Claude se registra solo)
app/oauth/authorize/route.ts             Página de login de ActiveCollab
app/oauth/token/route.ts                 Emisión y renovación de tokens
lib/auth/                                Cifrado, lógica OAuth y páginas de login
lib/mcp/handler.ts                       Servidor MCP con autenticación
lib/mcp/tools.ts                         Herramientas que ve Claude
lib/activecollab/client.ts               Cliente de la API de ActiveCollab
lib/activecollab/docs.ts                 Búsqueda en la documentación
docs/activecollab-api/                   Documentación de la API en markdown
scripts/build-api-docs.py                Regenera la documentación
```
