"""Comprueba el sitio generado, sin necesitar Node.js ni un navegador."""

from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch

import build


class PageParser(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.elements = []
        self.feed(source)

    def handle_starttag(self, tag, attributes):
        self.elements.append((tag, dict(attributes)))

    handle_startendtag = handle_starttag


class BuildTests(unittest.TestCase):
    def setUp(self):
        self.temporary = TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.output = build.build_site(Path(self.temporary.name) / "site")
        self.html = (self.output / "index.html").read_text(encoding="utf-8")
        self.page = PageParser(self.html)

    def test_content_is_prerendered_and_ids_are_unique(self):
        sections = [attrs["id"] for tag, attrs in self.page.elements if tag == "section"]
        self.assertEqual(sections, [section["id"] for section in build.NAVIGATION])
        ids = [attrs["id"] for _, attrs in self.page.elements if "id" in attrs]
        self.assertFalse([name for name, count in Counter(ids).items() if count > 1])
        for project in build.PROJECTS:
            self.assertIn(project["description"], self.html)
        self.assertNotIn("/_next/", self.html)

    def test_local_resources_and_internal_links_exist(self):
        ids = {attrs["id"] for _, attrs in self.page.elements if "id" in attrs}
        for tag, attrs in self.page.elements:
            for key in ("src", "href", "config"):
                value = attrs.get(key, "")
                with self.subTest(tag=tag, attribute=key, value=value):
                    if value.startswith("/"):
                        self.assertTrue((self.output / value.lstrip("/")).is_file())
                    elif value.startswith("#"):
                        self.assertIn(value[1:], ids)
            for identifier in attrs.get("aria-labelledby", "").split():
                self.assertIn(identifier, ids)
            if tag == "img":
                self.assertIn("alt", attrs)
        for css in (self.output / "styles").glob("*.css"):
            for resource in re.findall(r"url\(['\"]?(/[^)'\"]+)", css.read_text()):
                self.assertTrue((self.output / resource.lstrip("/")).is_file())

    def test_pyscript_modules_are_published_and_private_files_are_not(self):
        config = json.loads((self.output / "pyscript.json").read_text())
        for source in config["files"]:
            self.assertTrue((self.output / source).is_file())
        self.assertTrue((self.output / "python/main.py").is_file())
        for private in ("portfolio", "templates", "build.py", ".venv", "requirements.txt"):
            self.assertFalse((self.output / private).exists())

    def test_page_loads_two_compiled_stylesheets(self):
        local_styles = [
            attrs for tag, attrs in self.page.elements
            if tag == "link" and attrs.get("rel") == "stylesheet"
            and attrs.get("href", "").startswith("/")
        ]
        self.assertEqual(len(local_styles), 2)
        for attributes in local_styles:
            self.assertRegex(attributes["href"], r"^/styles/(app|dark)\.[a-f0-9]{12}\.min\.css$")
        dark = next(attrs for attrs in local_styles if attrs.get("id") == "dark-theme-styles")
        self.assertEqual(dark["media"], "(prefers-color-scheme: dark)")
        self.assertEqual(len(list((self.output / "styles").glob("*.css"))), 2)

    def test_cv_and_pending_project_links(self):
        cv = [attrs for _, attrs in self.page.elements if attrs.get("class") == "cv-button"]
        self.assertIn("disabled", cv[0])
        projects = [{**build.PROJECTS[0], "website_url": ""}]
        with patch.object(build, "CV_URL", "https://example.com/cv.pdf"), patch.object(build, "PROJECTS", projects):
            build.build_site(self.output)
        page = PageParser((self.output / "index.html").read_text())
        cv = [attrs for _, attrs in page.elements if attrs.get("class") == "cv-button"][0]
        self.assertEqual(cv["href"], "https://example.com/cv.pdf")
        pending = [attrs for _, attrs in page.elements if attrs.get("aria-disabled") == "true"]
        self.assertEqual(len(pending), 1)
        self.assertEqual(pending[0]["tabindex"], "-1")
        self.assertNotIn("href", pending[0])

    def test_template_escapes_editable_content(self):
        projects = [{**build.PROJECTS[0], "name": '<script>alert("test")</script>'}]
        with patch.object(build, "PROJECTS", projects):
            build.build_site(self.output)
        html = (self.output / "index.html").read_text()
        self.assertIn("&lt;script&gt;", html)
        self.assertNotIn('<script>alert("test")</script>', html)

    def test_skills_without_available_logos_still_render(self):
        groups = [{
            "label": "DATOS",
            "aria_label": "Datos",
            "description": "",
            "tools": [
                {"name": "Redis", "icon": "redis"},
                {"name": "PostgreSQL", "icon": "postgresql"},
                {"name": "En aprendizaje", "icon": ""},
                {"name": "Otra herramienta"},
            ],
        }]
        logos = {"redis": "/assets/png/logo-eliminado.png", "": ""}
        with patch.object(build, "SKILL_GROUPS", groups), patch.object(build, "TOOL_LOGOS", logos):
            build.build_site(self.output)
        html = (self.output / "index.html").read_text()
        page = PageParser(html)
        for tool in groups[0]["tools"]:
            self.assertIn(f'<span>{tool["name"]}</span>', html)
        self.assertFalse(any(attrs.get("class") == "tool-logo" for _, attrs in page.elements))


if __name__ == "__main__":
    unittest.main()
