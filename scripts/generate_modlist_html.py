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
    return f'<div class="mod-item" title="{title}">{text}</div>'


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
        f'<div class="category-card">'
        f'<div class="category-header" onclick="toggleId(\'{section_id}\')">'
        f'<span class="cat-icon">{icon}</span>'
        f"<span>{html.escape(cat_display)}</span>"
        f'<span class="badge-sm">{count}</span></div>'
        f'<div class="category-body collapsed" id="{section_id}">{items}</div></div>'
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
            f'    <div class="asset-card" title="{html.escape(path, quote=True)}">'
            f'        <div class="asset-icon">{icon}</div>'
            f'        <div class="asset-info">'
            f'            <span class="asset-name">{html.escape(name)}</span>'
            f'            <span class="asset-path">{html.escape(folder_key)}</span>'
            f"        </div>\n    </div>"
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
    <title>NETHERIOUS SEASON III - Ultimate Wiki</title>
    <link rel="icon" type="image/x-icon" href="netherious.ico">
    <link href="https://fonts.googleapis.com/css2?family=VT323&family=Outfit:wght@300;400;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg: #1a0f05;
            --panel: #2a150a;
            --card: #3a2010;
            --accent: #d4a574;
            --accent-dark: #8B4513;
            --text: #e8dcc8;
            --muted: #a89f91;
            --border: #5c3d1a;
            --highlight: #ffdd00;
            --success: #10b981;
            --danger: #ef4444;
            --glass: rgba(0, 0, 0, 0.3);
        }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            background-color: var(--bg);
            background-image: linear-gradient(rgba(26, 15, 5, 0.92), rgba(26, 15, 5, 0.92)), url('netherious.png');
            background-size: cover;
            background-attachment: fixed;
            color: var(--text);
            font-family: 'Outfit', sans-serif;
            padding: 2rem;
            scroll-behavior: smooth;
        }}
        ::-webkit-scrollbar {{ width: 12px; }}
        ::-webkit-scrollbar-track {{ background: var(--panel); border-left: 2px solid var(--border); }}
        ::-webkit-scrollbar-thumb {{ background: var(--accent-dark); border: 2px solid var(--panel); box-shadow: inset -2px -2px 0px rgba(0, 0, 0, 0.3), inset 2px 2px 0px rgba(255, 255, 255, 0.1); }}

        .header {{ text-align: center; margin-bottom: 4rem; position: relative; }}
        .header h1 {{ font-family: 'VT323', monospace; font-size: 5.5rem; color: var(--highlight); text-shadow: 6px 6px 0px #000; letter-spacing: -2px; margin-bottom: 0.5rem; text-transform: uppercase; }}
        .header p {{ color: var(--muted); font-size: 1.4rem; font-family: 'VT323', monospace; text-transform: uppercase; letter-spacing: 2px; }}

        .stats-bar {{ display: flex; justify-content: center; gap: 1.5rem; margin-top: 2rem; flex-wrap: wrap; }}
        .stat-pill {{ background: var(--panel); border: 4px solid var(--border); padding: 0.8rem 1.8rem; font-family: 'VT323', monospace; font-size: 1.3rem; display: flex; align-items: center; gap: 12px; box-shadow: 5px 5px 0px #000; transition: 0.2s; }}
        .stat-pill b {{ color: var(--highlight); font-size: 1.6rem; }}
        .stat-pill:hover {{ transform: scale(1.05); }}

        .grid-layout {{ display: grid; grid-template-columns: 340px 1fr 340px; gap: 2rem; max-width: 1800px; margin: 0 auto; }}
        .column-section {{ background: var(--glass); border: 4px solid var(--border); padding: 1.5rem; height: fit-content; box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px); }}
        .section-title {{ font-family: 'VT323', monospace; font-size: 2.2rem; text-transform: uppercase; color: var(--accent); margin-bottom: 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; text-shadow: 2px 2px 0px #000; }}
        .badge-count {{ background: var(--accent-dark); color: #fff; padding: 4px 15px; font-size: 1.2rem; font-family: 'VT323', monospace; border: 2px solid #000; box-shadow: 3px 3px 0px #000; }}

        .category-card {{ background: var(--card); border: 2px solid var(--border); margin-bottom: 1rem; overflow: hidden; transition: 0.2s; }}
        .category-header {{ padding: 1rem; cursor: pointer; display: flex; align-items: center; gap: 12px; font-family: 'VT323', monospace; font-size: 1.5rem; }}
        .category-header:hover {{ background: rgba(255, 255, 255, 0.05); color: var(--highlight); }}
        .category-body {{ padding: 0.8rem; border-top: 2px solid var(--border); display: flex; flex-direction: column; gap: 6px; background: rgba(0, 0, 0, 0.2); }}
        .category-body.collapsed {{ display: none; }}
        .mod-item {{ padding: 0.5rem 0.8rem; background: rgba(0,0,0,0.3); border-radius: 4px; font-size: 0.9rem; color: var(--muted); border-left: 3px solid transparent; transition: 0.2s; cursor: default; }}
        .mod-item:hover {{ color: #fff; background: var(--panel); border-left-color: var(--accent); transform: translateX(5px); }}

        .bottom-area {{ margin-top: 6rem; max-width: 1800px; margin-left: auto; margin-right: auto; padding-bottom: 5rem; }}
        .asset-section {{ margin-bottom: 4rem; }}
        .panel-title {{ font-size: 2.5rem; margin-bottom: 2rem; font-family: 'VT323', monospace; color: var(--highlight); text-shadow: 3px 3px 0px #000; display: flex; align-items: center; gap: 15px; }}
        .panel-title::after {{ content: ''; flex: 1; height: 4px; background: var(--border); margin-left: 20px; box-shadow: 0 2px 0 #000; }}

        .asset-grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }}
        .asset-card {{ background: var(--card); border: 3px solid var(--border); padding: 1rem; display: flex; align-items: center; gap: 15px; transition: 0.3s; position: relative; box-shadow: 5px 5px 0px rgba(0,0,0,0.3); }}
        .asset-card:hover {{ transform: translate(-3px, -3px); box-shadow: 8px 8px 0px rgba(0,0,0,0.4); border-color: var(--accent); }}
        .asset-icon {{ font-size: 2rem; background: var(--panel); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border: 2px solid var(--border); box-shadow: inset 0 0 10px rgba(0,0,0,0.5); }}
        .asset-info {{ display: flex; flex-direction: column; gap: 4px; }}
        .asset-name {{ font-weight: 600; font-size: 1rem; color: var(--text); }}
        .asset-path {{ font-size: 0.75rem; color: var(--muted); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; opacity: 0.7; }}

        @media (max-width: 1300px) {{ .grid-layout {{ grid-template-columns: 1fr; }} }}
    </style>
    <script>
        function toggleId(id) {{ document.getElementById(id).classList.toggle('collapsed'); }}
    </script>
</head>
<body>
    <div class="header">
        <img src="netherious.png" alt="NETHERIOUS" style="max-width: 650px; width: 100%; image-rendering: pixelated; margin-bottom: 1rem;">
        <p>Expertly Modded Season III · NeoForge 1.21.1</p>
        <div class="stats-bar">
            <div class="stat-pill"><b>{count_client}</b> Local</div>
            <div class="stat-pill"><b>{count_both}</b> Core</div>
            <div class="stat-pill"><b>{count_server}</b> Server</div>
            <div class="stat-pill"><b>{asset_count}</b> Assets</div>
        </div>
    </div>

    <div class="grid-layout">
        {col_client}
        {col_both}
        {col_server}
    </div>

    <div class="bottom-area">
{rp_section}
{sha_section}
    </div>
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
