"""Animación ASCII a 12 FPS, suspendida fuera de pantalla o en segundo plano."""

from pyscript import document, window
from pyscript.ffi import create_proxy, is_none

from ascii_art import render_ascii_arches
from browser_events import BrowserEvents


class HeroAtmosphere:
    FRAME_INTERVAL_MS = 1000 / 12

    def __init__(self):
        self.element = document.querySelector(".hero-atmosphere")
        self.desktop_field = document.querySelector(".atmosphere-ascii--desktop")
        self.mobile_field = document.querySelector(".atmosphere-ascii--mobile")
        self.mobile = window.matchMedia("(max-width: 760px)")
        self.reduced_motion = window.matchMedia("(prefers-reduced-motion: reduce)")
        self.visible = False
        self.animation_id = None
        self.previous_frame = 0
        self.elapsed = 0
        self.started = False
        self.events = BrowserEvents()
        self.observer = None
        self.tick_callback = None
        self.visibility_callback = None

    def start(self):
        if self.started or any(
            is_none(element) for element in (self.element, self.desktop_field, self.mobile_field)
        ):
            return
        self.started = True
        self.tick_callback = create_proxy(self.tick)
        self.visibility_callback = create_proxy(self.handle_intersection)
        self.observer = window.IntersectionObserver.new(self.visibility_callback)
        self.observer.observe(self.element)
        self.events.listen(self.mobile, "change", self.update_playback)
        self.events.listen(self.reduced_motion, "change", self.update_playback)
        self.events.listen(document, "visibilitychange", self.update_playback)
        self.render_frame()

    def stop(self):
        if not self.started:
            return
        self.started = False
        self.visible = False
        self.events.clear()
        self.observer.disconnect()
        self.observer = None
        if self.animation_id is not None:
            window.cancelAnimationFrame(self.animation_id)
            self.animation_id = None
        self.tick_callback.destroy()
        self.visibility_callback.destroy()
        self.tick_callback = None
        self.visibility_callback = None

    def render_frame(self):
        field = self.mobile_field if self.mobile.matches else self.desktop_field
        field.textContent = render_ascii_arches(self.elapsed, self.mobile.matches)

    def handle_intersection(self, entries, observer):
        self.visible = entries[0].isIntersecting
        self.update_playback()

    def update_playback(self, event=None):
        if not self.started:
            return
        if self.animation_id is not None:
            window.cancelAnimationFrame(self.animation_id)
            self.animation_id = None
        self.render_frame()
        if self.visible and not document.hidden and not self.reduced_motion.matches:
            self.previous_frame = window.performance.now()
            self.animation_id = window.requestAnimationFrame(self.tick_callback)

    def tick(self, now):
        if not self.started:
            return
        delta = now - self.previous_frame
        if delta >= self.FRAME_INTERVAL_MS:
            # Evita saltos grandes al volver de una pestaña inactiva.
            self.elapsed += min(delta, 100) / 1000
            self.previous_frame = now
            self.render_frame()
        self.animation_id = window.requestAnimationFrame(self.tick_callback)
