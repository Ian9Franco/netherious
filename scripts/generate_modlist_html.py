#!/usr/bin/env python3
"""Generate public/modlist/modlist.html from a Windows tree export (modlist.txt)."""

import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_INPUT = ROOT / "public" / "modlist" / "modlist_source.txt"
OUTPUT = ROOT / "public" / "modlist" / "modlist.html"

COLUMN_MAP = {
    "client": ("💻", "Client-Side", "section-💻client-side"),
    "both": ("⚔️", "Netherious Core", "core"),
    "server": ("☁️", "Server-Side", "section-☁️server-side"),
}

CLIENT_ASSET_FOLDERS = {
    "rec": ("resourcepacks", "🖼️", "Resource Packs"),
    "sha": ("shaderpacks", "🌈", "Shader Packs"),
}

CATEGORY_ICONS = {
    "animaciones": "🎬",
    "menu": "📋",
    "particulas": "✨",
    "qol-cli": "🎨",
    "rendimiento": "⚡",
    "ux": "🖥️",
    "combat": "⚔️",
    "core": "🔧",
    "create basics": "⚙️",
    "create dependiente": "🔗",
    "dungeons _ mazmorras": "🏰",
    "fauna-pasivos": "🐾",
    "food": "🍳",
    "herrmaientas": "🛠️",
    "jefes": "👹",
    "mecanicas": "⚙️",
    "mobs-enemigos": "💀",
    "mundo": "🌍",
    "sable": "🚀",
    "tecnologia": "🔬",
    "util": "📦",
    "utilidad _ qol": "✨",
    "mecanica": "⚙️",
}


def slugify(name: str) -> str:
    s = name.lower().strip()
    s = s.replace(" & ", "&").replace(" _ ", "-").replace(" ", "-")
    s = re.sub(r"[^a-z0-9&_-]+", "", s)
    return s or "misc"


def display_category(name: str) -> str:
    return name.replace(" _ ", " & ")


def _pipe_depth(line: str) -> int:
    depth = 0
    idx = 0
    while line.startswith("|   ", idx):
        depth += 1
        idx += 4
    return depth


def _indent_depth(line: str) -> int:
    pipe = _pipe_depth(line)
    if pipe:
        return pipe
    stripped = line.lstrip(" \t")
    return max(0, (len(line) - len(stripped)) // 4)


def _parse_section(top: str, lines: list[str]) -> dict[str, list[str]]:
    categories: dict[str, list[str]] = {}
    stack: list[tuple[int, str]] = [(0, top)]

    folder_re = re.compile(r"^(\s*(?:\|   )*)(?:\+---|\\---)(.+?)\s*$")
    file_re = re.compile(r".+\.(?:jar|zip)\s*$", re.IGNORECASE)

    for line in lines:
        folder_m = folder_re.match(line)
        if folder_m:
            name = folder_m.group(2).strip()
            depth = max(1, _indent_depth(line))
            stack = stack[: depth + 1]
            if len(stack) == depth + 1:
                stack[depth] = (depth, name)
            else:
                stack.append((depth, name))
            continue

        if not file_re.match(line.strip()):
            continue
        filename = line.strip().split("|")[-1].strip()
        if not filename.lower().endswith((".jar", ".zip")):
            continue
        cat = stack[-1][1] if len(stack) > 1 else "root"
        categories.setdefault(cat, []).append(filename)

    return categories


def parse_tree(text: str) -> dict[str, dict[str, list[str]]]:
    """Return {top_level: {category: [filenames]}}."""
    tree: dict[str, dict[str, list[str]]] = {}
    section_re = re.compile(
        r"^(?:\|   )*(?:\+---|\\---)(both|client|no|server)\s*$", re.IGNORECASE
    )
    lines = text.splitlines()
    i = 0
    while i < len(lines):
        m = section_re.match(lines[i])
        if m:
            top = m.group(1).lower()
            i += 1
            body: list[str] = []
            while i < len(lines) and not section_re.match(lines[i]):
                body.append(lines[i])
                i += 1
            if top != "no":
                tree[top] = _parse_section(top, body)
        else:
            i += 1
    return tree


def strip_ext(filename: str) -> str:
    if filename.lower().endswith(".jar"):
        return filename[:-4]
    if filename.lower().endswith(".zip"):
        return filename[:-4]
    return filename


def mod_item(relative_path: str, label: str) -> str:
    title = html.escape(relative_path, quote=True)
    text = html.escape(label)
    key = html.escape(label.lower(), quote=True)
    return f'<div class="mod-item" data-label="{key}" title="{title}">{text}</div>'


def category_card(
    section_prefix: str,
    category: str,
    files: list[str],
    path_prefix: str,
) -> str:
    if not files:
        return ""
    cat_display = display_category(category) if category != "root" else "misc"
    cat_slug = slugify(category)
    icon = CATEGORY_ICONS.get(category.lower(), "📦")
    section_id = f"{section_prefix}-{cat_slug}"
    items = "".join(
        mod_item(f"{path_prefix}/{f}", strip_ext(f))
        for f in sorted(files, key=str.lower)
    )
    count = len(files)
    return (
        f'<article class="category-card" data-category="{html.escape(cat_display.lower(), quote=True)}">'
        f'<button type="button" class="category-header" aria-expanded="false" aria-controls="{section_id}">'
        f'<span class="chevron" aria-hidden="true"></span>'
        f'<span class="cat-icon">{icon}</span>'
        f'<span class="cat-name">{html.escape(cat_display)}</span>'
        f'<span class="badge-sm">{count}</span></button>'
        f'<div class="category-body collapsed" id="{section_id}">{items}</div></article>'
    )


def column_section(
    top_key: str,
    categories: dict[str, list[str]],
    skip_categories: set[str] | None = None,
) -> tuple[str, int]:
    skip = skip_categories or set()
    emoji, title, prefix = COLUMN_MAP[top_key]
    path_root = top_key
    cards: list[str] = []
    total = 0
    for cat in sorted(categories.keys(), key=lambda c: (c == "root", c.lower())):
        if cat in skip:
            continue
        files = categories[cat]
        total += len(files)
        path_prefix = path_root if cat == "root" else f"{path_root}/{cat}"
        cards.append(category_card(prefix, cat, files, path_prefix))
    inner = "".join(cards)
    section = (
        f'<div class="column-section">'
        f'<h2 class="section-title">{emoji} {title} '
        f'<span class="badge-count">{total}</span></h2>{inner}</div>'
    )
    return section, total


def asset_grid(folder_key: str, files: list[str], icon: str) -> str:
    cards = []
    for f in sorted(files, key=str.lower):
        name = strip_ext(f)
        path = f"{folder_key}/{f}"
        cards.append(
            f'    <article class="asset-card" data-label="{html.escape(name.lower(), quote=True)}" title="{html.escape(path, quote=True)}">'
            f'        <div class="asset-icon" aria-hidden="true">{icon}</div>'
            f'        <div class="asset-info">'
            f'            <span class="asset-name">{html.escape(name)}</span>'
            f'            <span class="asset-path">{html.escape(folder_key)}</span>'
            f"        </div>\n    </article>"
        )
    return "\n".join(cards)


def build_html(tree: dict[str, dict[str, list[str]]]) -> str:
    client = tree.get("client", {})
    both = tree.get("both", {})
    server = tree.get("server", {})

    client_skip = set(CLIENT_ASSET_FOLDERS.keys())
    col_client, count_client = column_section("client", client, client_skip)
    col_both, count_both = column_section("both", both)
    col_server, count_server = column_section("server", server)

    rp_files = client.get("rec", [])
    sha_files = client.get("sha", [])
    asset_count = len(rp_files) + len(sha_files)

    rp_section = ""
    if rp_files:
        rp_section = f"""
        <div class="asset-section">
            <h3 class="panel-title">🖼️ Resource Packs ({len(rp_files)})</h3>
            <div class="asset-grid">
{asset_grid("client/rec", rp_files, "🖼️")}
            </div>
        </div>"""

    sha_section = ""
    if sha_files:
        sha_section = f"""
        <div class="asset-section">
            <h3 class="panel-title">🌈 Shader Packs ({len(sha_files)})</h3>
            <div class="asset-grid">
{asset_grid("client/sha", sha_files, "🌈")}
            </div>
        </div>"""

    return f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Netherious IV — Modlist</title>
    <link rel="icon" type="image/x-icon" href="netherious.ico">
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,650&family=Outfit:wght@360;500;640&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {{
            --ink: #0b0a0e;
            --ink-raised: #141218;
            --ink-card: #1c1822;
            --ink-line: rgba(243, 230, 214, 0.1);
            --velvet: #6e2a48;
            --velvet-deep: #3d1728;
            --velvet-glow: #c57b96;
            --almond: #f3e6d6;
            --almond-dim: #c9b6a4;
            --hearth: #e7c4a2;
            --shadow: 0 18px 50px rgba(0, 0, 0, 0.38);
        }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        html {{ scroll-padding-top: 92px; }}
        body {{
            min-height: 100vh;
            background:
                radial-gradient(900px 420px at 50% -80px, rgba(110, 42, 72, 0.45), transparent 70%),
                radial-gradient(700px 380px at 100% 20%, rgba(231, 196, 162, 0.08), transparent 60%),
                var(--ink);
            color: var(--almond);
            font-family: 'Outfit', sans-serif;
            line-height: 1.45;
        }}
        ::-webkit-scrollbar {{ width: 10px; }}
        ::-webkit-scrollbar-track {{ background: var(--ink); }}
        ::-webkit-scrollbar-thumb {{ background: var(--velvet-deep); border-radius: 99px; }}

        .wrap {{ width: min(1480px, calc(100% - 2.4rem)); margin: 0 auto; }}
        .hero {{
            padding: 2.6rem 0 1.4rem;
            display: grid;
            grid-template-columns: minmax(180px, 280px) 1fr;
            gap: 2rem;
            align-items: center;
        }}
        .hero img {{
            width: 100%;
            max-width: 280px;
            image-rendering: pixelated;
            filter: drop-shadow(0 16px 28px rgba(61, 23, 40, 0.7));
        }}
        .eyebrow {{
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            font-size: 0.72rem;
            color: var(--hearth);
            font-weight: 640;
        }}
        .eyebrow::before {{
            content: '';
            width: 28px;
            height: 1px;
            background: var(--velvet-glow);
        }}
        h1 {{
            font-family: 'Fraunces', serif;
            font-weight: 650;
            font-size: clamp(3.2rem, 7vw, 5.6rem);
            line-height: 0.9;
            letter-spacing: -0.04em;
            color: var(--almond);
            margin: 0.35rem 0 0.6rem;
        }}
        h1 span {{ color: var(--velvet-glow); font-style: italic; font-weight: 500; }}
        .lede {{ color: var(--almond-dim); max-width: 38rem; font-size: 1.05rem; }}
        .stats-bar {{ display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: 1.4rem; }}
        .stat-pill {{
            background: rgba(20, 18, 24, 0.8);
            border: 1px solid var(--ink-line);
            border-radius: 999px;
            padding: 0.45rem 0.85rem 0.45rem 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.65rem;
            color: var(--almond-dim);
            font-size: 0.86rem;
        }}
        .stat-pill b {{
            min-width: 2.4rem;
            text-align: center;
            background: var(--velvet);
            color: var(--almond);
            border-radius: 999px;
            padding: 0.18rem 0.55rem;
            font-size: 0.95rem;
        }}

        .toolbar {{
            position: sticky;
            top: 0;
            z-index: 20;
            margin: 0.4rem 0 1.4rem;
            padding: 0.75rem 0;
            background: linear-gradient(var(--ink) 70%, rgba(11, 10, 14, 0));
        }}
        .toolbar-inner {{
            display: flex;
            gap: 0.7rem;
            align-items: center;
            flex-wrap: wrap;
            background: rgba(20, 18, 24, 0.92);
            border: 1px solid var(--ink-line);
            border-radius: 18px;
            padding: 0.7rem;
            box-shadow: var(--shadow);
            backdrop-filter: blur(14px);
        }}
        .search {{
            flex: 1 1 240px;
            min-width: 0;
            background: var(--ink);
            color: var(--almond);
            border: 1px solid transparent;
            border-radius: 12px;
            padding: 0.78rem 0.95rem;
            font: inherit;
            outline: none;
        }}
        .search:focus {{ border-color: var(--velvet-glow); }}
        .search::placeholder {{ color: #8d7d70; }}
        .tool-btn, .jump {{
            border: 1px solid var(--ink-line);
            background: transparent;
            color: var(--almond);
            border-radius: 12px;
            padding: 0.72rem 0.9rem;
            font: inherit;
            cursor: pointer;
            text-decoration: none;
        }}
        .tool-btn:hover, .jump:hover, .tool-btn:focus-visible, .jump:focus-visible {{
            border-color: var(--velvet-glow);
            color: var(--hearth);
            outline: none;
        }}
        .search-meta {{ color: var(--almond-dim); font-size: 0.85rem; min-width: 7rem; }}
        .empty {{
            display: none;
            margin: 1rem 0 2rem;
            padding: 1.2rem 1.3rem;
            border-radius: 16px;
            border: 1px dashed rgba(197, 123, 150, 0.45);
            color: var(--almond-dim);
        }}
        .empty.visible {{ display: block; }}

        .grid-layout {{
            display: grid;
            grid-template-columns: minmax(260px, 0.85fr) minmax(320px, 1.3fr) minmax(260px, 0.85fr);
            gap: 1rem;
            align-items: start;
        }}
        .column-section {{
            background: rgba(20, 18, 24, 0.72);
            border: 1px solid var(--ink-line);
            border-radius: 22px;
            padding: 1rem;
            box-shadow: var(--shadow);
        }}
        .section-title {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.8rem;
            font-family: 'Fraunces', serif;
            font-size: 1.55rem;
            font-weight: 500;
            margin: 0.2rem 0.3rem 1rem;
            color: var(--almond);
        }}
        .badge-count {{
            font-family: 'Outfit', sans-serif;
            font-size: 0.78rem;
            letter-spacing: 0.04em;
            background: var(--velvet-deep);
            color: var(--hearth);
            border-radius: 999px;
            padding: 0.25rem 0.65rem;
        }}
        .category-card {{
            background: var(--ink-card);
            border: 1px solid var(--ink-line);
            border-radius: 14px;
            margin-bottom: 0.55rem;
            overflow: hidden;
        }}
        .category-card.is-hidden {{ display: none; }}
        .category-header {{
            width: 100%;
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            text-align: left;
            padding: 0.78rem 0.85rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.65rem;
        }}
        .category-header:hover, .category-header:focus-visible {{
            background: rgba(110, 42, 72, 0.22);
            outline: none;
        }}
        .chevron {{
            width: 0.45rem;
            height: 0.45rem;
            border-right: 1.5px solid var(--hearth);
            border-bottom: 1.5px solid var(--hearth);
            transform: rotate(-45deg);
            transition: transform 0.18s ease;
            flex: none;
        }}
        .category-card:has(.category-body:not(.collapsed)) .chevron {{ transform: rotate(45deg); }}
        .cat-name {{ flex: 1; font-weight: 500; }}
        .badge-sm {{
            color: var(--hearth);
            background: rgba(110, 42, 72, 0.35);
            border-radius: 999px;
            padding: 0.12rem 0.5rem;
            font-size: 0.78rem;
        }}
        .category-body {{
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            padding: 0 0.7rem 0.75rem;
        }}
        .category-body.collapsed {{ display: none; }}
        .mod-item {{
            padding: 0.48rem 0.7rem;
            border-radius: 10px;
            font-size: 0.9rem;
            color: var(--almond-dim);
            background: rgba(11, 10, 14, 0.45);
            overflow-wrap: anywhere;
        }}
        .mod-item:hover {{ color: var(--almond); background: rgba(110, 42, 72, 0.28); }}
        .mod-item.is-hidden {{ display: none; }}

        .bottom-area {{ padding: 2.4rem 0 4rem; }}
        .asset-section {{ margin-bottom: 2.2rem; }}
        .asset-section.is-hidden {{ display: none; }}
        .panel-title {{
            font-family: 'Fraunces', serif;
            font-weight: 500;
            font-size: 2rem;
            margin-bottom: 1rem;
            color: var(--almond);
        }}
        .asset-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 0.75rem; }}
        .asset-card {{
            background: var(--ink-card);
            border: 1px solid var(--ink-line);
            border-radius: 16px;
            padding: 0.85rem;
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }}
        .asset-card:hover {{ border-color: rgba(197, 123, 150, 0.55); }}
        .asset-card.is-hidden {{ display: none; }}
        .asset-icon {{
            width: 46px;
            height: 46px;
            flex: none;
            display: grid;
            place-items: center;
            border-radius: 12px;
            background: var(--velvet-deep);
            font-size: 1.25rem;
        }}
        .asset-info {{ min-width: 0; display: flex; flex-direction: column; gap: 0.15rem; }}
        .asset-name {{ font-weight: 500; overflow-wrap: anywhere; }}
        .asset-path {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.68rem;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            color: var(--almond-dim);
        }}
        .footer-note {{ color: var(--almond-dim); font-size: 0.82rem; padding-bottom: 2rem; }}

        @media (max-width: 1080px) {{
            .hero {{ grid-template-columns: 1fr; text-align: left; }}
            .hero img {{ max-width: 180px; }}
            .grid-layout {{ grid-template-columns: 1fr; }}
        }}
    </style>
</head>
<body>
    <div class="wrap">
        <header class="hero">
            <img src="netherious.png" alt="Netherious">
            <div>
                <p class="eyebrow">Modlist · NeoForge 1.21.1</p>
                <h1>Netherious <span>IV</span></h1>
                <p class="lede">Lista viva del pack. Busca un mod, abre una categoría o salta directo a client, core o server.</p>
                <div class="stats-bar">
                    <div class="stat-pill"><b>{count_client}</b> Client</div>
                    <div class="stat-pill"><b>{count_both}</b> Core</div>
                    <div class="stat-pill"><b>{count_server}</b> Server</div>
                    <div class="stat-pill"><b>{asset_count}</b> Assets</div>
                </div>
            </div>
        </header>

        <div class="toolbar">
            <div class="toolbar-inner">
                <input id="mod-search" class="search" type="search" placeholder="Buscar mod, pack o categoría" autocomplete="off" aria-label="Buscar en el modlist">
                <button type="button" class="tool-btn" id="expand-all">Abrir todo</button>
                <button type="button" class="tool-btn" id="collapse-all">Cerrar todo</button>
                <a class="jump" href="#col-client">Client</a>
                <a class="jump" href="#col-core">Core</a>
                <a class="jump" href="#col-server">Server</a>
                <a class="jump" href="#assets">Assets</a>
                <span class="search-meta" id="search-meta" aria-live="polite"></span>
            </div>
        </div>
        <p class="empty" id="empty-state">Ningún resultado para esa búsqueda.</p>

        <div class="grid-layout">
            <div id="col-client">{col_client}</div>
            <div id="col-core">{col_both}</div>
            <div id="col-server">{col_server}</div>
        </div>

        <div class="bottom-area" id="assets">
{rp_section}
{sha_section}
        </div>
        <p class="footer-note">Netherious IV · paleta Obsidian Ink, Velvet Curfew y Almond Hearth.</p>
    </div>
    <script>
        const search = document.getElementById('mod-search');
        const meta = document.getElementById('search-meta');
        const empty = document.getElementById('empty-state');
        const cards = Array.from(document.querySelectorAll('.category-card'));
        const items = Array.from(document.querySelectorAll('.mod-item, .asset-card'));
        const sections = Array.from(document.querySelectorAll('.asset-section'));

        function setOpen(card, open) {{
            const body = card.querySelector('.category-body');
            const button = card.querySelector('.category-header');
            if (!body || !button) return;
            body.classList.toggle('collapsed', !open);
            button.setAttribute('aria-expanded', open ? 'true' : 'false');
        }}

        document.querySelectorAll('.category-header').forEach((button) => {{
            button.addEventListener('click', () => {{
                const card = button.closest('.category-card');
                const open = button.getAttribute('aria-expanded') !== 'true';
                setOpen(card, open);
            }});
        }});

        document.getElementById('expand-all').addEventListener('click', () => {{
            cards.forEach((card) => setOpen(card, true));
        }});
        document.getElementById('collapse-all').addEventListener('click', () => {{
            cards.forEach((card) => setOpen(card, false));
            search.value = '';
            applyFilter();
        }});

        function applyFilter() {{
            const query = search.value.trim().toLowerCase();
            let visible = 0;
            items.forEach((item) => {{
                const label = item.dataset.label || item.textContent.toLowerCase();
                const show = !query || label.includes(query);
                item.classList.toggle('is-hidden', !show);
                if (show) visible += 1;
            }});
            cards.forEach((card) => {{
                const name = card.dataset.category || '';
                const categoryHit = Boolean(query) && name.includes(query);
                if (categoryHit) {{
                    card.querySelectorAll('.mod-item').forEach((item) => item.classList.remove('is-hidden'));
                }}
                const visibleItems = card.querySelectorAll('.mod-item:not(.is-hidden)').length;
                const show = !query || categoryHit || visibleItems > 0;
                card.classList.toggle('is-hidden', !show);
                if (query && show) setOpen(card, true);
            }});
            if (query) {{
                visible = document.querySelectorAll('.mod-item:not(.is-hidden), .asset-card:not(.is-hidden)').length;
            }}
            sections.forEach((section) => {{
                const visibleCards = section.querySelectorAll('.asset-card:not(.is-hidden)').length;
                section.classList.toggle('is-hidden', query && visibleCards === 0);
            }});
            meta.textContent = query ? visible + ' coincidencias' : '';
            empty.classList.toggle('visible', Boolean(query) && visible === 0);
        }}
        search.addEventListener('input', applyFilter);
    </script>
</body>
</html>
"""


def main() -> int:
    input_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_INPUT
    if not input_path.is_file():
        print(f"Input not found: {input_path}", file=sys.stderr)
        return 1
    text = input_path.read_text(encoding="utf-8", errors="replace")
    tree = parse_tree(text)
    OUTPUT.write_text(build_html(tree), encoding="utf-8")
    print(f"Wrote {OUTPUT} from {input_path}")
    client = sum(
        len(v)
        for k, v in tree.get("client", {}).items()
        if k not in CLIENT_ASSET_FOLDERS
    )
    both = sum(len(v) for v in tree.get("both", {}).values())
    server = sum(len(v) for v in tree.get("server", {}).values())
    print(f"Counts — client: {client}, both: {both}, server: {server}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
