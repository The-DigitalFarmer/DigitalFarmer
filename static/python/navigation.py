"""Menú móvil y enlace activo según la posición de las secciones."""

from pyscript import document, window
from pyscript.ffi import create_proxy, is_none

from browser_events import BrowserEvents


class Navigation:
    def __init__(self):
        self.header = document.querySelector(".header")
        self.toggle = document.querySelector(".nav-toggle")
        self.links = list(document.querySelectorAll("#main-navigation a"))
        self.sections = []
        for link in self.links:
            section = document.getElementById(link.hash[1:])
            if not is_none(section):
                self.sections.append((link, section))
        self.mobile = window.matchMedia("(max-width: 760px)")
        self.menu_open = False
        self.started = False
        self.frame_id = None
        self.frame_callback = None
        self.active_id = None
        self.events = BrowserEvents()

    def start(self):
        if self.started or is_none(self.header) or is_none(self.toggle) or not self.sections:
            return
        self.started = True
        self.active_id = None
        self.frame_callback = create_proxy(self.update_active_section)
        self.events.listen(self.toggle, "click", self.toggle_menu)
        self.events.listen(document, "keydown", self.handle_keydown)
        self.events.listen(document, "click", self.handle_click)
        self.events.listen(self.mobile, "change", self.close_menu)
        self.events.listen(window, "scroll", self.schedule_update, passive=True)
        self.events.listen(window, "resize", self.schedule_update)
        self.update_active_section()
        self.toggle.hidden = False
        document.documentElement.classList.add("python-ready")

    def stop(self):
        if not self.started:
            return
        self.started = False
        self.events.clear()
        if self.frame_id is not None:
            window.cancelAnimationFrame(self.frame_id)
            self.frame_id = None
        self.frame_callback.destroy()
        self.frame_callback = None
        self.close_menu()
        self.toggle.hidden = True
        document.documentElement.classList.remove("python-ready")

    def set_menu_open(self, is_open):
        self.menu_open = is_open
        self.toggle.setAttribute("aria-expanded", "true" if is_open else "false")
        action = "Cerrar" if is_open else "Abrir"
        self.toggle.setAttribute("aria-label", f"{action} menú de navegación")

    def toggle_menu(self, event):
        self.set_menu_open(not self.menu_open)

    def close_menu(self, event=None):
        self.set_menu_open(False)

    def handle_keydown(self, event):
        if event.key == "Escape" and self.menu_open:
            self.close_menu()
            self.toggle.focus()

    def handle_click(self, event):
        if not self.header.contains(event.target):
            self.close_menu()
        elif event.target.closest('a[href^="#"]'):
            # Un solo evento cubre el logo y todos los enlaces del menú.
            self.close_menu()

    def schedule_update(self, event=None):
        if self.started and self.frame_id is None:
            self.frame_id = window.requestAnimationFrame(self.frame_callback)

    def update_active_section(self, timestamp=None):
        self.frame_id = None
        active_id = self.sections[0][1].id
        threshold = window.innerHeight * 0.45
        for link, section in reversed(self.sections):
            if section.getBoundingClientRect().top <= threshold:
                active_id = section.id
                break
        if active_id == self.active_id:
            return
        self.active_id = active_id
        for link, section in self.sections:
            active = section.id == active_id
            link.classList.toggle("nav-active", active)
            if active:
                link.setAttribute("aria-current", "location")
            else:
                link.removeAttribute("aria-current")
