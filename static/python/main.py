"""Punto de entrada de PyScript. El contenido ya está presente en el HTML."""

from datetime import date

from pyscript import document, window
from pyscript.ffi import is_none

from atmosphere import HeroAtmosphere
from browser_events import BrowserEvents
from navigation import Navigation
from theme import ThemeSwitcher

theme = ThemeSwitcher()
navigation = Navigation()
atmosphere = HeroAtmosphere()
components = (theme, navigation, atmosphere)


def start_application(event=None):
    for component in components:
        component.start()
    year = document.getElementById("year")
    if not is_none(year):
        year.textContent = str(date.today().year)


def stop_application(event):
    for component in reversed(components):
        component.stop()


# Al volver con Atrás/Adelante, se reactivan sin duplicar eventos ni animaciones.
lifecycle = BrowserEvents()
lifecycle.listen(window, "pagehide", stop_application)
lifecycle.listen(window, "pageshow", start_application)
start_application()
