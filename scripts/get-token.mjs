#!/usr/bin/env node
/**
 * Obtiene un token de la API de ActiveCollab (nube) para usarlo en ACTIVECOLLAB_TOKEN.
 * Uso: npm run get-token
 *
 * Tu contraseña solo se envía a activecollab.com y no se guarda en ningún sitio.
 */
import readline from "node:readline";

const LOGIN_URL = "https://activecollab.com/api/v1/external/login";
const CLIENT_VENDOR = "ActiveCollab MCP";
const CLIENT_NAME = "Claude MCP Server";

function ask(question, { hidden = false } = {}) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    if (hidden) {
      rl._writeToOutput = (s) => {
        if (s.includes(question)) rl.output.write(s);
        else rl.output.write("*".repeat(s.length));
      };
    }
    rl.question(question, (answer) => {
      rl.close();
      if (hidden) process.stdout.write("\n");
      resolve(answer.trim());
    });
  });
}

async function post(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Respuesta inesperada (${res.status}): ${text.slice(0, 300)}`);
  }
}

async function main() {
  console.log("Obtener token de la API de ActiveCollab (nube)\n");
  const email = await ask("Email de ActiveCollab: ");
  const password = await ask("Contraseña: ", { hidden: true });

  let login = await post(LOGIN_URL, { email, password });

  if (login.intent_id && !login.is_ok) {
    const code = await ask("Código de verificación en dos pasos: ");
    login = await post(LOGIN_URL, { intent_id: login.intent_id, code });
  }
  if (!login.is_ok) throw new Error(login.message || "No se pudo iniciar sesión.");

  const accounts = (login.accounts || []).filter((a) => a.intent);
  if (!accounts.length) throw new Error("Este usuario no tiene cuentas de ActiveCollab disponibles.");

  console.log("\nCuentas disponibles:");
  accounts.forEach((a, i) => console.log(`  ${i + 1}) ${a.display_name}  (ID ${a.name})`));
  const choice = accounts.length === 1 ? 1 : Number(await ask("Elige el número de la cuenta: "));
  const account = accounts[choice - 1];
  if (!account) throw new Error("Opción no válida.");

  const issued = await post(`https://app.activecollab.com/${account.name}/api/v1/issue-token`, {
    client_vendor: CLIENT_VENDOR,
    client_name: CLIENT_NAME,
    intent: account.intent,
  });
  if (!issued.is_ok || !issued.token) throw new Error("ActiveCollab no emitió el token.");

  console.log("\nListo. Agrega estas variables en Vercel (Settings → Environment Variables):\n");
  console.log(`ACTIVECOLLAB_ACCOUNT_ID=${account.name}`);
  console.log(`ACTIVECOLLAB_TOKEN=${issued.token}\n`);
  console.log("Guarda el token como un secreto: da acceso a ActiveCollab con los permisos de tu usuario.");
}

main().catch((err) => {
  console.error(`\nError: ${err.message}`);
  process.exit(1);
});
