"""Registro de eventos que libera los proxies de Python al desconectarse."""

from pyscript.ffi import create_proxy, to_js


class BrowserEvents:
    def __init__(self):
        self.bindings = []

    def listen(self, target, event_name, handler, passive=False):
        callback = create_proxy(handler)
        target.addEventListener(event_name, callback, to_js({"passive": passive}))
        self.bindings.append((target, event_name, callback))

    def clear(self):
        for target, event_name, callback in self.bindings:
            target.removeEventListener(event_name, callback)
            callback.destroy()
        self.bindings.clear()
