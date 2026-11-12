"""Selector de tema con preferencia local y seguimiento del tema del sistema."""

from pyscript import document, window
from pyscript.ffi import is_none

from browser_events import BrowserEvents

STORAGE_KEY = "digitalfarmer-theme"
VALID_THEMES = ("light", "dark")


class ThemeSwitcher:
    def __init__(self):
        self.root = document.documentElement
        self.button = document.getElementById("theme-toggle")
        self.dark_styles = document.getElementById("dark-theme-styles")
        self.theme_color = document.querySelector('meta[name="theme-color"]')
        self.system = window.matchMedia("(prefers-color-scheme: dark)")
        self.preference = None
        self.current_theme = None
        self.started = False
        self.events = BrowserEvents()

    def read_preference(self):
        try:
            saved = window.localStorage.getItem(STORAGE_KEY)
        except Exception:
            # Algunos navegadores bloquean el almacenamiento por privacidad.
            return self.preference
        return saved if saved in VALID_THEMES else None

    def start(self):
        if self.started or is_none(self.button) or is_none(self.dark_styles):
            return
        self.started = True
        self.preference = self.read_preference()
        for target, event, handler in (
            (self.button, "click", self.toggle),
            (self.system, "change", self.follow_system),
            (window, "storage", self.sync_preference),
        ):
            self.events.listen(target, event, handler)
        self.apply_preference()
        self.button.hidden = False

    def stop(self):
        if not self.started:
            return
        self.started = False
        self.events.clear()
        self.button.hidden = True

    def apply_preference(self):
        system_theme = "dark" if self.system.matches else "light"
        self.apply_theme(self.preference or system_theme)

    def apply_theme(self, theme):
        dark = theme == "dark"
        self.current_theme = theme
        # El CSS también sigue al sistema antes de que PyScript esté disponible.
        self.dark_styles.media = "all" if dark else "not all"
        self.root.setAttribute("data-theme", theme)
        self.button.setAttribute("aria-pressed", "true" if dark else "false")
        self.button.title = "Activar modo claro" if dark else "Activar modo oscuro"
        if not is_none(self.theme_color):
            self.theme_color.content = "#0d0b0a" if dark else "#ffffff"

    def toggle(self, event):
        self.preference = "light" if self.current_theme == "dark" else "dark"
        self.apply_preference()
        try:
            window.localStorage.setItem(STORAGE_KEY, self.preference)
        except Exception:
            # El selector sigue funcionando aunque no se pueda guardar la elección.
            pass

    def follow_system(self, event):
        if self.preference is None:
            self.apply_preference()

    def sync_preference(self, event):
        # También sincroniza otras pestañas y el borrado de la preferencia.
        if is_none(event.key) or event.key == STORAGE_KEY:
            self.preference = self.read_preference()
            self.apply_preference()
