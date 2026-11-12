"""Verifica que los eventos se desconecten y sus proxies se liberen."""

import importlib.util
from pathlib import Path
from types import ModuleType
import unittest
from unittest.mock import Mock, patch


class BrowserEventsTests(unittest.TestCase):
    def test_clear_removes_listeners_and_destroys_each_proxy_once(self):
        proxy = Mock()
        ffi = ModuleType("pyscript.ffi")
        ffi.create_proxy = Mock(return_value=proxy)
        ffi.to_js = lambda value: value
        source = Path(__file__).resolve().parent.parent / "static/python/browser_events.py"
        specification = importlib.util.spec_from_file_location("browser_events_test", source)
        module = importlib.util.module_from_spec(specification)
        with patch.dict("sys.modules", {"pyscript": ModuleType("pyscript"), "pyscript.ffi": ffi}):
            specification.loader.exec_module(module)

        target = Mock()
        handler = Mock()
        events = module.BrowserEvents()
        events.listen(target, "scroll", handler, passive=True)
        target.addEventListener.assert_called_once_with("scroll", proxy, {"passive": True})
        events.clear()
        events.clear()
        target.removeEventListener.assert_called_once_with("scroll", proxy)
        proxy.destroy.assert_called_once_with()
        self.assertEqual(events.bindings, [])


if __name__ == "__main__":
    unittest.main()
