"""Servidor de desarrollo: regenera la página al recargar el navegador."""

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import subprocess
import sys
from threading import Lock
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent
BUILD_LOCK = Lock()


def rebuild():
    # Un proceso nuevo vuelve a leer los datos Python en cada recarga.
    with BUILD_LOCK:
        subprocess.run([sys.executable, str(ROOT / "build.py")], check=True)


class DevelopmentHandler(SimpleHTTPRequestHandler):
    """Sirve únicamente dist; los datos y las plantillas quedan privados."""

    def do_GET(self):
        if urlsplit(self.path).path in ("/", "/index.html"):
            try:
                rebuild()
            except subprocess.CalledProcessError:
                self.send_error(500, "No se pudo generar el sitio. Revisa la terminal.")
                return
        super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=3000)
    parser.add_argument("--host", default="127.0.0.1")
    arguments = parser.parse_args()
    rebuild()
    handler = partial(DevelopmentHandler, directory=str(ROOT / "dist"))
    with ThreadingHTTPServer((arguments.host, arguments.port), handler) as server:
        print(f"Portafolio en http://{arguments.host}:{arguments.port}", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")


if __name__ == "__main__":
    main()
