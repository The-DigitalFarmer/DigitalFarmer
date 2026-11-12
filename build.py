"""Genera un sitio estático a partir de datos Python y plantillas HTML."""

from datetime import date
from pathlib import Path
import shutil

from jinja2 import Environment, FileSystemLoader, StrictUndefined, select_autoescape

from portfolio.data.about import CV_URL, FOCUS_AREAS
from portfolio.data.experience import EXPERIENCES
from portfolio.data.projects import PROJECTS
from portfolio.data.skills import SKILL_GROUPS
from portfolio.site import (
    CHANNELS, DESCRIPTION, NAVIGATION, PYSCRIPT_VERSION, TITLE, TOOL_LOGOS,
)
from static.python.ascii_art import render_ascii_arches
from portfolio.styles import compile_styles

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "dist"


def available_tool_logos():
    """Devuelve solo logos configurados cuyo archivo local todavía existe."""
    return {
        name: url
        for name, url in TOOL_LOGOS.items()
        if url and (ROOT / "public" / url.lstrip("/")).is_file()
    }


def build_site(output=OUTPUT):
    """Renderiza la página y copia solo los archivos públicos a output."""
    output = Path(output)
    styles = compile_styles(output)
    environment = Environment(
        loader=FileSystemLoader(ROOT / "templates"),
        autoescape=select_autoescape(["html"]),
        undefined=StrictUndefined,
        trim_blocks=True,
        lstrip_blocks=True,
        keep_trailing_newline=True,
    )
    page = environment.get_template("index.html").render(
        title=TITLE,
        styles=styles,
        description=DESCRIPTION,
        pyscript_version=PYSCRIPT_VERSION,
        navigation=NAVIGATION,
        channels=CHANNELS,
        tool_logos=available_tool_logos(),
        cv_url=CV_URL,
        focus_areas=FOCUS_AREAS,
        projects=PROJECTS,
        skill_groups=SKILL_GROUPS,
        experiences=EXPERIENCES,
        year=date.today().year,
        desktop_ascii=render_ascii_arches(),
        mobile_ascii=render_ascii_arches(mobile=True),
    )
    shutil.copytree(ROOT / "public", output, dirs_exist_ok=True)
    shutil.copytree(
        ROOT / "static", output, dirs_exist_ok=True,
        ignore=shutil.ignore_patterns("__pycache__", "__init__.py", "styles"),
    )
    (output / "index.html").write_text(page, encoding="utf-8")
    return output


if __name__ == "__main__":
    print(f"Sitio generado en {build_site()}")
