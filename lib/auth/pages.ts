import { createHash } from "node:crypto";

/** Páginas HTML del inicio de sesión. Sin JavaScript; todo el contenido dinámico se escapa. */

const esc = (s: unknown) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const STYLE = `
:root{--bg:#f6f7f9;--card:#fff;--text:#16181d;--muted:#5d6470;--border:#d9dde3;--accent:#2563eb;--accent-text:#fff;--error-bg:#fdecec;--error:#a61b1b}
@media (prefers-color-scheme:dark){:root{--bg:#0f1115;--card:#181b21;--text:#eceef2;--muted:#a0a7b4;--border:#2c313a;--accent:#3b82f6;--accent-text:#fff;--error-bg:#3a1717;--error:#ffb4b4}}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg);color:var(--text);font:16px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;padding:16px}
main{width:100%;max-width:400px;background:var(--card);border:1px solid var(--border);border-radius:14px;padding:28px}
h1{font-size:1.3rem;margin:0 0 6px}
p{margin:0 0 16px;color:var(--muted)}
label{display:block;font-weight:600;margin:14px 0 6px}
input[type=email],input[type=password],input[type=text]{width:100%;padding:11px 12px;border:1px solid var(--border);border-radius:9px;background:transparent;color:var(--text);font-size:16px}
input:focus{outline:2px solid var(--accent);outline-offset:1px}
.btn{display:block;width:100%;margin-top:20px;padding:12px;border:0;border-radius:9px;background:var(--accent);color:var(--accent-text);font-size:16px;font-weight:600;cursor:pointer}
.link{display:block;width:100%;margin-top:10px;padding:8px;border:0;background:none;color:var(--muted);font-size:14px;cursor:pointer}
.err{background:var(--error-bg);color:var(--error);border-radius:9px;padding:10px 12px;margin:0 0 14px;font-size:14px}
.acct{display:block;width:100%;text-align:left;margin-top:10px;padding:12px;border:1px solid var(--border);border-radius:9px;background:transparent;color:var(--text);font-size:16px;cursor:pointer}
.acct small{color:var(--muted)}
.note{font-size:13px;margin-top:18px}
`;

const STYLE_HASH = createHash("sha256").update(STYLE).digest("base64");

export function htmlResponse(body: string, opts: { status?: number; formActions?: string[]; setCookie?: string[] } = {}) {
  const formActions = ["'self'", ...(opts.formActions || [])].join(" ");
  const headers = new Headers({
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
    "Content-Security-Policy": `default-src 'none'; style-src 'sha256-${STYLE_HASH}'; form-action ${formActions}; frame-ancestors 'none'; base-uri 'none'`,
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
  });
  for (const c of opts.setCookie || []) headers.append("Set-Cookie", c);
  return new Response(body, { status: opts.status ?? 200, headers });
}

function layout(title: string, content: string) {
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${esc(title)}</title><style>${STYLE}</style></head>
<body><main>${content}</main></body></html>`;
}

const errorBox = (error?: string) => (error ? `<div class="err" role="alert">${esc(error)}</div>` : "");

const cancelButton = (reqToken: string) =>
  `<form method="post" action="/oauth/authorize"><input type="hidden" name="req" value="${esc(reqToken)}"><input type="hidden" name="step" value="cancel"><button class="link" type="submit">Cancelar</button></form>`;

export function loginPage(o: { reqToken: string; clientName: string; redirectHost: string; email?: string; error?: string }) {
  return layout(
    "Conectar ActiveCollab",
    `<h1>Conectar ActiveCollab</h1>
<p><strong>${esc(o.clientName)}</strong> (${esc(o.redirectHost)}) quiere acceder a tu cuenta de ActiveCollab con tus permisos.</p>
${errorBox(o.error)}
<form method="post" action="/oauth/authorize" autocomplete="on">
<input type="hidden" name="req" value="${esc(o.reqToken)}"><input type="hidden" name="step" value="login">
<label for="email">Email</label><input id="email" name="email" type="email" required autocomplete="username" value="${esc(o.email)}">
<label for="password">Contraseña</label><input id="password" name="password" type="password" required autocomplete="current-password">
<button class="btn" type="submit">Iniciar sesión y conectar</button>
</form>
${cancelButton(o.reqToken)}
<p class="note">Tu contraseña solo se usa para pedir un token a ActiveCollab y no se guarda.</p>`,
  );
}

export function twoFactorPage(o: { reqToken: string; pendingToken: string; error?: string }) {
  return layout(
    "Verificación en dos pasos",
    `<h1>Verificación en dos pasos</h1>
<p>Escribe el código de tu aplicación de autenticación.</p>
${errorBox(o.error)}
<form method="post" action="/oauth/authorize" autocomplete="off">
<input type="hidden" name="req" value="${esc(o.reqToken)}"><input type="hidden" name="step" value="two_factor">
<input type="hidden" name="pending" value="${esc(o.pendingToken)}">
<label for="code">Código</label><input id="code" name="code" type="text" inputmode="numeric" autocomplete="one-time-code" required>
<button class="btn" type="submit">Verificar</button>
</form>
${cancelButton(o.reqToken)}`,
  );
}

export function chooseAccountPage(o: { reqToken: string; pendingToken: string; accounts: { id: string; name: string }[] }) {
  const buttons = o.accounts
    .map(
      (a) =>
        `<button class="acct" type="submit" name="account" value="${esc(a.id)}">${esc(a.name)}<br><small>Cuenta ${esc(a.id)}</small></button>`,
    )
    .join("");
  return layout(
    "Elige la cuenta",
    `<h1>Elige la cuenta</h1>
<p>Tu usuario tiene acceso a varias cuentas de ActiveCollab.</p>
<form method="post" action="/oauth/authorize">
<input type="hidden" name="req" value="${esc(o.reqToken)}"><input type="hidden" name="step" value="account">
<input type="hidden" name="pending" value="${esc(o.pendingToken)}">${buttons}
</form>
${cancelButton(o.reqToken)}`,
  );
}

export function errorPage(title: string, message: string, status = 400) {
  return htmlResponse(layout(title, `<h1>${esc(title)}</h1><p>${esc(message)}</p>`), { status });
}
