"""Genera las tarjetas accesibles del catálogo sin dependencias externas.

Uso: python3 tools/build.py
Los PDF y la página publicada están en dist/. No se necesita Python en producción.
"""

import json
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"


def render_card(book):
    """Cada tarjeta es un enlace real al PDF, incluso antes de cargar PyScript."""
    title = escape(book["title"])
    book_id = escape(book["id"], quote=True)
    cover_titles = {
        "aprende-python": "Aprende<br><em>Python.</em>",
        "think-python": "Think<br><em>Python.</em>",
        "python-intermedio": "Python<br><em>intermedio.</em>",
        "inventa-juegos": "Inventa tus<br>propios<br><em>juegos.</em>",
    }
    art = {
        "aprende-python": '<svg class="cover-python"><use href="#python-mark"/></svg>',
        "think-python": '<div class="cover-orbit"><span>{</span><b>idea</b><span>}</span></div>',
        "python-intermedio": '<div class="cover-code">&gt;&gt;&gt; next(you)<br><span>un nuevo nivel_</span></div>',
        "inventa-juegos": '<div class="cover-game" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>',
    }
    return f'''<article class="book-card" data-id="{book_id}" data-level="{escape(book['level'])}">
  <a class="book-link" href="{escape(book['file'])}" data-book="{book_id}" aria-label="Leer {title}, de {escape(book['author'])}">
    <div class="book-art art-{book['color']}">
      <div class="cover-jacket"><div class="cover-topline"><span>LA BIBLIOTECA PYTHON</span><span>{book['number']}</span></div><div class="cover-title">{cover_titles[book['id']]}</div>{art[book['id']]}<div class="cover-author">{escape(book['author'])}</div></div>
      <span class="cover-read">Abrir libro <span>↗</span></span>
    </div>
    <div class="book-info"><div class="book-meta"><span class="level-badge">{escape(book['level'])}</span><span>{book['pages']} páginas</span></div><h3>{title}</h3><p class="book-author">{escape(book['author'])}</p><p class="book-description">{escape(book['description'])}</p><div class="book-bottom"><span class="book-action" data-action-label="{book_id}">Empezar a leer</span><svg class="icon"><use href="#arrow"/></svg></div><span class="book-progress" data-progress="{book_id}"></span></div>
  </a>
</article>'''


def main():
    books = json.loads((DIST / "books.json").read_text())
    html_file = DIST / "index.html"
    html = html_file.read_text()
    start = "<!-- BOOK_CARDS -->"
    end = "<!-- /BOOK_CARDS -->"
    cards = "\n".join(render_card(book) for book in books)
    if end in html:
        before, rest = html.split(start, 1)
        _, after = rest.split(end, 1)
        html = before + start + "\n" + cards + "\n" + end + after
    else:
        html = html.replace(start, start + "\n" + cards + "\n" + end)
    data_start = '<script id="book-data" type="application/json">'
    before, rest = html.split(data_start, 1)
    _, after = rest.split("</script>", 1)
    # Evita que contenido futuro pueda cerrar la etiqueta script.
    safe_json = json.dumps(books, ensure_ascii=False).replace("<", "\\u003c")
    html_file.write_text(before + data_start + safe_json + "</script>" + after)
    print(f"Catálogo generado: {len(books)} libros, {sum(b['pages'] for b in books)} páginas.")


if __name__ == "__main__":
    main()
