"""Compila CSS legible en dos hojas pequeñas con nombres según su contenido."""

from hashlib import sha256
from pathlib import Path

from rcssmin import cssmin

STYLES_DIRECTORY = Path(__file__).resolve().parent.parent / "static" / "styles"

# El orden es explícito para conservar la cascada y facilitar su mantenimiento.
APP_STYLE_FILES = (
    "theme.css",
    "global.css",
    "sections.css",
    "header.css",
    "footer.css",
    "hero.css",
    "hero-atmosphere.css",
    "skills.css",
    "about.css",
    "projects.css",
    "experience.css",
    "contact.css",
)


def compile_styles(output):
    """Publica los estilos comunes y el tema oscuro sin modificar las fuentes."""
    destination = Path(output) / "styles"
    destination.mkdir(parents=True, exist_ok=True)
    sources = {
        "app": "\n".join(
            (STYLES_DIRECTORY / name).read_text(encoding="utf-8")
            for name in APP_STYLE_FILES
        ),
        "dark": (STYLES_DIRECTORY / "theme-dark.css").read_text(encoding="utf-8"),
    }
    urls = {}
    for bundle, source in sources.items():
        content = cssmin(source).encode("utf-8")
        fingerprint = sha256(content).hexdigest()[:12]
        filename = f"{bundle}.{fingerprint}.min.css"
        (destination / filename).write_bytes(content)
        urls[bundle] = f"/styles/{filename}"

    # Retira también las hojas sueltas de compilaciones anteriores.
    current_files = {Path(url).name for url in urls.values()}
    for previous in destination.glob("*.css"):
        if previous.name not in current_files:
            previous.unlink()
    return urls
