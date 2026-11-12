"""Comprueba que PyScript publique solo módulos usados y todas sus dependencias."""

import ast
import json
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parent.parent


class PyScriptConfigTests(unittest.TestCase):
    def test_all_browser_modules_are_reachable_and_configured(self):
        sources = {
            file.stem: file
            for file in (ROOT / "static/python").glob("*.py")
            if file.name != "__init__.py"
        }
        pending = ["main"]
        reachable = set()
        while pending:
            name = pending.pop()
            if name in reachable:
                continue
            reachable.add(name)
            for node in ast.walk(ast.parse(sources[name].read_text())):
                if isinstance(node, ast.ImportFrom) and node.module:
                    imports = [node.module.split(".")[0]]
                elif isinstance(node, ast.Import):
                    imports = [alias.name.split(".")[0] for alias in node.names]
                else:
                    continue
                pending.extend(module for module in imports if module in sources)

        self.assertEqual(reachable, set(sources), "Hay módulos del navegador sin uso")
        config = json.loads((ROOT / "static/pyscript.json").read_text())
        expected = {f"./python/{name}.py": f"./{name}.py" for name in reachable - {"main"}}
        self.assertEqual(config["files"], expected)


if __name__ == "__main__":
    unittest.main()
