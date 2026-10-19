# ActiveCollab MCP

Conecta **Claude** con **ActiveCollab**. Cualquier persona con una cuenta de ActiveCollab pega una URL en Claude, inicia sesión con su cuenta y listo. Desde el chat, Claude puede revisar tareas, crear proyectos, registrar horas, comentar, consultar facturas y usar cualquier otra función de la API, siempre con los permisos de esa persona.

El repo incluye la **documentación completa de la API de ActiveCollab** (124 páginas, 275 endpoints) en [`docs/activecollab-api`](docs/activecollab-api/README.md). Claude la consulta para saber qué endpoint usar en cada caso.

> Servicio independiente, no afiliado ni respaldado por ActiveCollab.

Hay dos formas de usarlo:

| | Cómo | Para quién |
|---|---|---|
| **Servicio público** | Pegas la URL del servicio en Claude y listo | Cualquier persona con cuenta de ActiveCollab |
| **Tu propio servidor** | Despliegas tu copia en Vercel, limitada a tu empresa | Empresas que prefieren su propia infraestructura |

## Usar el servicio

**Claude (web, escritorio y móvil):**
1. **Ajustes → Conectores → Agregar conector personalizado**.
2. Nombre: `ActiveCollab`. URL: `https://<dominio-del-servicio>/api/mcp`.
3. Pulsa **Conectar** e inicia sesión con tu cuenta de ActiveCollab. Si tienes verificación en dos pasos, también te pedirá el código. Si tienes varias cuentas, eliges una.
4. En un chat, activa el conector desde el menú de herramientas.

> En planes Team o Enterprise de Claude, quien administra la organización puede agregar el conector una vez para todos. Después, cada persona solo pulsa **Conectar**.

**Claude Code:**
```bash
claude mcp add --transport http activecollab https://<dominio-del-servicio>/api/mcp
```
Después ejecuta `/mcp` y elige **Authenticate**.

### Ejemplos

- "¿Qué tareas tengo pendientes y cuáles vencen esta semana?"
- "Crea una tarea 'Revisar maqueta' en el proyecto Web, asignada a Ana, para el viernes"
- "Registra 2,5 horas hoy en la tarea 34 del proyecto Web: reunión con cliente"
- "¿Cuántas horas registró el equipo en el proyecto Web este mes?"
- "Muéstrame las facturas pendientes de pago"

## Cómo funciona

```
Claude ──MCP + OAuth──▶ servidor: /api/mcp ──API v1 (token de cada persona)──▶ app.activecollab.com/<cuenta>
```

1. Claude detecta que el servidor pide inicio de sesión y abre la página de login.
2. La persona inicia sesión con ActiveCollab. El servidor pide a ActiveCollab un token para ella y se lo entrega a Claude **cifrado**. El servidor no guarda nada.
3. Desde ese momento, cada acción de Claude usa el token de esa persona.

Herramientas que ve Claude:

| Tipo | Herramientas |
|---|---|
| **Uso diario** | `whoami`, `list_projects`, `get_project`, `create_project`, `update_project`, `list_task_lists`, `create_task_list`, `list_tasks`, `list_user_tasks`, `get_task`, `create_task`, `update_task`, `complete_task`, `add_subtask`, `complete_subtask`, `add_comment`, `list_discussions`, `create_discussion`, `list_notes`, `create_note`, `list_job_types`, `log_time`, `list_time_records`, `log_expense`, `search`, `list_users`, `list_companies`, `list_labels`, `move_to_trash` |
| **Documentación** | `search_api_docs` (busca endpoints, también en español), `get_api_doc_page` (ejemplos reales de cada endpoint), `list_api_endpoints` |
| **Acceso total** | `activecollab_api_request`: llama a cualquier endpoint (facturas, presupuestos, equipos, reportes, papelera…) |

## Poner en marcha el servicio público

Así se configura el servicio principal en Vercel Pro:

1. **Importa el repo** en [vercel.com/new](https://vercel.com/new).
2. **Agrega Upstash Redis:** en el proyecto, **Storage → Create Database → Upstash for Redis** (el plan gratuito sobra) y conéctalo al proyecto. Las variables se crean solas.
3. **Variables de entorno** (**Settings → Environment Variables**):

| Variable | Valor |
|---|---|
| `AUTH_SECRET` | clave aleatoria: `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"` |
| `PUBLIC_URL` | `https://<tu-dominio>` (sin barra final) |

   **No** pongas `ACTIVECOLLAB_ALLOWED_ACCOUNT_IDS`: sin esa variable, el servicio queda abierto a cualquier cuenta de ActiveCollab.
4. **Redespliega** (**Deployments → Redeploy**) para que tome las variables.
5. **Opcional:** agrega un dominio propio en **Settings → Domains** y actualiza `PUBLIC_URL`.
6. **Opcional:** en **Firewall**, crea una regla con límite de peticiones para `/oauth/` como protección extra.
7. **Comprueba** que `https://<tu-dominio>` muestre la página del servicio y que `https://<tu-dominio>/.well-known/oauth-authorization-server` devuelva JSON. Después conecta tu propia cuenta desde Claude.

## Desplegar tu propio servidor

Para usarlo solo dentro de tu empresa:

1. Pulsa el botón **Desplegar en Vercel** de la página del servicio, o importa este repo en Vercel.
2. Configura estas variables:
   - `AUTH_SECRET`: una clave aleatoria de al menos 32 caracteres.
   - `ACTIVECOLLAB_ALLOWED_ACCOUNT_IDS`: el ID de tu cuenta, el número de `app.activecollab.com/123456`. Puedes poner varios separados por comas.
   - `SERVICE_OWNER_NAME` y `SERVICE_CONTACT_EMAIL`: tu nombre o empresa y tu email. Aparecen en la política de privacidad.
   - `PUBLIC_URL`: recomendada.
3. Recomendado: agrega Upstash Redis como en el paso 2 de la sección anterior.
4. Comparte con tu equipo `https://<tu-app>.vercel.app/api/mcp`.

> Usa el dominio de producción. Las URLs de preview suelen estar protegidas por Vercel y Claude no puede entrar.

## Variables de entorno

Ver [`.env.example`](.env.example).

| Variable | Obligatoria | Descripción |
|---|---|---|
| `AUTH_SECRET` | Sí | Clave maestra de cifrado (mínimo 32 caracteres) |
| `PUBLIC_URL` | Recomendada | URL pública, sin barra final |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Recomendada | Límite de intentos (también acepta `KV_REST_API_URL` / `KV_REST_API_TOKEN`) |
| `ACTIVECOLLAB_ALLOWED_ACCOUNT_IDS` | No | Limita el acceso a esas cuentas. Vacía = cualquier cuenta |
| `ACTIVECOLLAB_READ_ONLY` | No | `true` bloquea todo lo que no sea lectura |
| `SERVICE_NAME`, `SERVICE_OWNER_NAME`, `SERVICE_CONTACT_EMAIL` | No | Datos de la página pública y de las políticas |
| `OAUTH_ALLOWED_REDIRECT_HOSTS` | No | Hosts extra a los que se permite volver tras el login |

## Seguridad

- **Permisos propios:** cada persona usa sus permisos de ActiveCollab. Claude no puede hacer nada que esa persona no pueda hacer.
- **Contraseñas:** solo se usan en el momento del login para pedir un token a ActiveCollab. No se guardan ni se registran.
- **Tokens cifrados:** AES-256-GCM, con una clave distinta para cada tipo de token, derivada de `AUTH_SECRET`. El token de ActiveCollab nunca viaja en claro. Los access tokens duran 1 hora y los refresh tokens 30 días.
- **Solo clientes de Claude:** el login solo puede devolver a `claude.ai`, `claude.com` o `localhost` (Claude Code y Desktop).
- **OAuth 2.1 con PKCE (S256) obligatorio:** los códigos caducan en 1 minuto y los tokens van ligados a este servidor.
- **Página de login protegida:** cookie anti-CSRF ligada al navegador, comprobación del origen, CSP estricta sin JavaScript y sin iframes.
- **Límite de intentos con Upstash:**
  - Login: 10 por IP cada 10 minutos y 5 por email cada 15 minutos.
  - Registro de clientes y tokens: también limitados.
  - Redis solo guarda la IP y un hash del email, que se borran solos.
  - Si Redis no responde, el servicio sigue funcionando sin límite.
- **Al renovar el acceso** se comprueba que el token de ActiveCollab siga activo.
- **Cerrar todas las sesiones:** cambia `AUTH_SECRET` y redespliega.
- **Cabeceras de seguridad** en todo el sitio: HSTS, `nosniff`, `DENY` para iframes y `Permissions-Policy`.

## Cobro (más adelante)

El acceso se decide en un solo lugar: [`lib/auth/access.ts`](lib/auth/access.ts). Se consulta al iniciar sesión, en cada renovación y en cada petición MCP. Para cobrar una suscripción bastará con que esa función consulte qué cuentas tienen el pago al día. Por ejemplo, con un webhook de Stripe que guarde las cuentas activas en Redis. Dejar de pagar cortaría el acceso en la siguiente petición.

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

```bash
pip install beautifulsoup4
npm run docs:build
```

Esto regenera `docs/activecollab-api/` y `lib/activecollab/api-docs.generated.json` a partir de https://developers.activecollab.com/api-documentation/.

## Estructura

```
app/page.tsx                             Página pública del servicio
app/privacidad, app/terminos             Política de privacidad y términos de uso
app/api/mcp/route.ts                     Endpoint MCP (requiere access token OAuth)
app/.well-known/oauth-*/                 Metadatos OAuth (descubrimiento automático)
app/oauth/register|authorize|token       Registro de clientes, login y emisión de tokens
lib/auth/                                Cifrado, OAuth, páginas de login y control de acceso
lib/rate-limit.ts                        Límite de intentos (Upstash Redis)
lib/mcp/                                 Servidor MCP y herramientas
lib/activecollab/                        Cliente de la API y búsqueda en la documentación
lib/site.ts                              Nombre, responsable y contacto del servicio
docs/activecollab-api/                   Documentación de la API en markdown
scripts/build-api-docs.py                Regenera la documentación
```
