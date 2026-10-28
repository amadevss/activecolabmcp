#!/usr/bin/env python3
"""
Descarga la documentación oficial de la API de ActiveCollab y la convierte en:

  docs/activecollab-api/**/*.md          -> documentación legible (una página por tema)
  docs/activecollab-api/README.md        -> índice de páginas y endpoints
  lib/activecollab/api-docs.generated.json -> lo que usa el servidor MCP

Uso:
  pip install beautifulsoup4
  python3 scripts/build-api-docs.py                 # descarga desde developers.activecollab.com
  python3 scripts/build-api-docs.py --source DIR    # usa una copia local ya descargada
"""

import argparse
import json
import re
import sys
import urllib.request
from pathlib import Path

from bs4 import BeautifulSoup

BASE_URL = "https://developers.activecollab.com/api-documentation/"
ROOT = Path(__file__).resolve().parent.parent
DOCS_DIR = ROOT / "docs" / "activecollab-api"
JSON_OUT = ROOT / "lib" / "activecollab" / "api-docs.generated.json"

# Las respuestas de ejemplo son enormes; guardamos solo el principio.
MAX_RESPONSE_LINES = 30
MAX_PAYLOAD_LINES = 80


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "activecollab-mcp-docs-builder"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8", errors="replace")


def load(rel: str, source: Path | None) -> str:
    if source:
        return (source / rel).read_text(encoding="utf-8", errors="replace")
    return fetch(BASE_URL + rel)


def code_of(node) -> str:
    """Texto del bloque de código (sin los números de línea)."""
    pre = node.select_one("div.syntax_higlighted_source pre") if node else None
    if not pre:
        return ""
    text = pre.get_text().strip()
    # Algunas respuestas son archivos (PDF, imágenes) mostrados como texto: se omiten.
    if text.count("\ufffd") > 5 or re.search(r"[\x00-\x08\x0e-\x1f]", text):
        return "(contenido binario omitido: el endpoint devuelve un archivo)"
    return redact(text)


# Los ejemplos oficiales traen claves de prueba (p. ej. Stripe). Se reemplazan para no
# guardar nada con forma de secreto en el repo.
SECRET_PATTERNS = [
    (re.compile(r"\b(sk|pk|rk)_(test|live)_[A-Za-z0-9]+"), r"\1_\2_REDACTED"),
    (re.compile(r"\b(whsec)_[A-Za-z0-9]+"), r"\1_REDACTED"),
]


def redact(text: str) -> str:
    for pattern, repl in SECRET_PATTERNS:
        text = pattern.sub(repl, text)
    return text


def truncate(text: str, max_lines: int) -> str:
    lines = text.splitlines()
    if len(lines) <= max_lines:
        return text
    return "\n".join(lines[:max_lines]) + f"\n... ({len(lines) - max_lines} líneas más)"


def singular(word: str) -> str:
    if word.endswith("ies"):
        return word[:-3] + "y"
    if word.endswith("sses") or word.endswith("xes"):
        return word[:-2]
    if word.endswith("s"):
        return word[:-1]
    return word


def path_template(path: str) -> str:
    """/projects/1/tasks/2 -> /projects/{project_id}/tasks/{task_id}"""
    out = []
    for i, seg in enumerate(path.strip("/").split("/")):
        if re.fullmatch(r"\d+", seg):
            prev = out[i - 1] if i > 0 else ""
            name = singular(prev).replace("-", "_") if prev and not prev.startswith("{") else ""
            out.append("{" + (name + "_id" if name else "id") + "}")
        else:
            out.append(seg)
    return "/" + "/".join(out)


def inline_text(el) -> str:
    """Convierte un párrafo HTML en markdown sencillo."""
    for code in el.find_all("code"):
        code.replace_with(f"`{code.get_text()}`")
    for a in el.find_all("a"):
        a.replace_with(a.get_text())
    return redact(re.sub(r"\s+", " ", el.get_text()).strip())


def parse_request(div):
    method = div.select_one("span.request_method").get_text(strip=True)
    raw_path = div.select_one("span.request_path").get_text(strip=True)
    persona = div.select_one("span.request_persona")
    status = div.select_one("span.http_code")
    path, _, query_string = raw_path.partition("?")
    path = "/" + path.lstrip("/")
    req = {
        "method": method,
        "path": path,
        "query_string": query_string,
        "persona": persona.get_text(strip=True).strip("()").replace("as ", "") if persona else "",
        "status": status.get_text(strip=True).replace("HTTP ", "") if status else "",
        "payload": "",
        "query": "",
        "files": "",
        "response": code_of(div.select_one("div.response")),
    }
    for label in div.select("div.payload_or_query p.block_head"):
        kind = label.get_text(strip=True)
        block = label.find_next_sibling("div")
        if kind.startswith("Payload"):
            req["payload"] = code_of(block)
        elif kind.startswith("Query"):
            req["query"] = code_of(block)
        elif kind.startswith("Files"):
            req["files"] = code_of(block)
    return req


def request_md(r) -> str:
    persona = f" _(como {r['persona']})_" if r["persona"] else ""
    qs = f"?{r['query_string']}" if r["query_string"] else ""
    md = [f"**`{r['method']} {r['path']}{qs}`** → HTTP {r['status']}{persona}", ""]
    for key, label in (("query", "Parámetros de query"), ("payload", "Payload"), ("files", "Archivos")):
        if r[key]:
            md += [f"{label}:", "```json", truncate(r[key], MAX_PAYLOAD_LINES), "```", ""]
    if r["response"]:
        md += ["Respuesta:", "```json", truncate(r["response"], MAX_RESPONSE_LINES), "```", ""]
    return "\n".join(md)


def parse_page(rel: str, html: str):
    soup = BeautifulSoup(html, "html.parser")
    article = soup.select_one("article")
    title = article.select_one("h1").get_text(strip=True)
    body = article.select_one("div.body")
    md = [f"# {title}", "", f"> Fuente: {BASE_URL}{rel}", ""]
    requests = []
    for el in body.children:
        if not getattr(el, "name", None):
            continue
        classes = el.get("class") or []
        if el.name == "div" and "request" in classes:
            r = parse_request(el)
            requests.append(r)
            md.append(request_md(r))
        elif el.name == "div" and "sleep" in classes:
            continue
        elif el.name == "div" and "note" in classes:
            md += [f"> **Nota:** {inline_text(el)}", ""]
        elif el.name in ("h1", "h3"):
            md += [f"## {el.get_text(strip=True).rstrip('#').strip()}", ""]
        elif el.name in ("ul", "ol"):
            for i, li in enumerate(el.find_all("li", recursive=False), 1):
                md.append(f"{i}. {inline_text(li)}" if el.name == "ol" else f"- {inline_text(li)}")
            md.append("")
        elif el.name == "p":
            md += [inline_text(el), ""]
    slug = rel.removeprefix("v1/").removesuffix(".html")
    return {
        "slug": slug,
        "title": title,
        "section": slug.rsplit("/", 1)[0] if "/" in slug else "general",
        "url": BASE_URL + rel,
        "markdown": "\n".join(md).strip() + "\n",
    }, requests


def first_json_keys(text: str):
    try:
        data = json.loads(text)
    except Exception:
        return []
    return sorted(data.keys()) if isinstance(data, dict) else []


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--source", type=Path, help="Carpeta con una copia local de la documentación")
    args = ap.parse_args()

    index_html = load("index.html", args.source)
    rels = sorted(set(re.findall(r'href="(v1/[^"]+\.html)"', index_html)))
    rels = [r for r in rels if "/test-" not in r]  # páginas internas de pruebas
    print(f"{len(rels)} páginas", file=sys.stderr)

    pages, endpoints = [], {}
    for rel in rels:
        page, requests = parse_page(rel, load(rel, args.source))
        pages.append(page)
        out = DOCS_DIR / (page["slug"] + ".md")
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(page["markdown"], encoding="utf-8")
        for r in requests:
            key = (r["method"], path_template(r["path"]))
            ep = endpoints.setdefault(key, {
                "method": key[0], "path": key[1], "pages": [], "example_path": r["path"],
                "payload_fields": set(), "query_fields": set(), "example_payload": "",
            })
            if page["slug"] not in ep["pages"]:
                ep["pages"].append(page["slug"])
            ep["payload_fields"].update(first_json_keys(r["payload"]))
            ep["query_fields"].update(first_json_keys(r["query"]))
            ep["query_fields"].update(k for k in re.findall(r"(?:^|&)([^=&]+)=", r["query_string"]))
            if r["payload"] and not ep["example_payload"]:
                ep["example_payload"] = truncate(r["payload"], 40)

    ep_list = []
    for ep in sorted(endpoints.values(), key=lambda e: (e["path"], e["method"])):
        ep["payload_fields"] = sorted(ep["payload_fields"])
        ep["query_fields"] = sorted(ep["query_fields"])
        ep_list.append(ep)

    JSON_OUT.parent.mkdir(parents=True, exist_ok=True)
    JSON_OUT.write_text(json.dumps({"source": BASE_URL, "pages": pages, "endpoints": ep_list},
                                   ensure_ascii=False, indent=1), encoding="utf-8")

    idx = ["# Documentación de la API de ActiveCollab", "",
           f"Generado con `scripts/build-api-docs.py` a partir de {BASE_URL}", "",
           "## Páginas", ""]
    section = None
    for p in sorted(pages, key=lambda p: p["slug"]):
        if p["section"] != section:
            section = p["section"]
            idx += ["", f"### {section}", ""]
        idx.append(f"- [{p['title']}]({p['slug']}.md)")
    idx += ["", "## Endpoints", "", "| Método | Ruta | Campos del payload | Páginas |", "|---|---|---|---|"]
    for ep in ep_list:
        fields = ", ".join(ep["payload_fields"][:12]) + (" …" if len(ep["payload_fields"]) > 12 else "")
        links = ", ".join(f"[{s}]({s}.md)" for s in ep["pages"][:3])
        idx.append(f"| {ep['method']} | `{ep['path']}` | {fields} | {links} |")
    (DOCS_DIR / "README.md").write_text("\n".join(idx) + "\n", encoding="utf-8")
    print(f"{len(pages)} páginas, {len(ep_list)} endpoints", file=sys.stderr)


if __name__ == "__main__":
    main()
