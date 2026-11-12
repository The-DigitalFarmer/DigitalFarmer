"""Verifica las hojas publicadas y la invalidación de caché por contenido."""

from pathlib import Path
import shutil
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch

from portfolio import styles


class StylesTests(unittest.TestCase):
    def test_all_source_stylesheets_are_registered_once(self):
        registered = [*styles.APP_STYLE_FILES, "theme-dark.css"]
        available = {file.name for file in styles.STYLES_DIRECTORY.glob("*.css")}
        self.assertEqual(set(registered), available)
        self.assertEqual(len(registered), len(set(registered)))

    def test_bundle_names_are_stable_and_change_with_content(self):
        with TemporaryDirectory() as temporary:
            root = Path(temporary)
            source = root / "source"
            output = root / "site"
            shutil.copytree(styles.STYLES_DIRECTORY, source)
            original = (source / "global.css").read_text()
            with patch.object(styles, "STYLES_DIRECTORY", source):
                first = styles.compile_styles(output)
                self.assertEqual(first, styles.compile_styles(output))
                self.assertEqual((source / "global.css").read_text(), original)

                (source / "global.css").write_text(original + "\n:root { --build-check: 1; }\n")
                second = styles.compile_styles(output)
                self.assertNotEqual(first["app"], second["app"])
                self.assertEqual(first["dark"], second["dark"])
                self.assertFalse((output / first["app"].lstrip("/")).exists())
                self.assertEqual(len(list((output / "styles").glob("*.css"))), 2)


if __name__ == "__main__":
    unittest.main()
