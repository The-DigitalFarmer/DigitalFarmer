"""Genera los arcos ASCII sin depender del navegador.

Se usa en la compilación para dibujar el primer fotograma y en PyScript
para animarlo. La geometría se calcula una sola vez por tamaño.
"""

from functools import lru_cache
from math import hypot, sin

GLYPHS = " .:-=+xX#8"


@lru_cache(maxsize=2)
def create_pattern(mobile=False):
    """Devuelve columnas y muestras de radio/textura para cada carácter."""
    columns, rows, center_row, horizontal_radius, vertical_radius = (
        (92, 44, 40, 49, 20) if mobile else (220, 54, 48, 51, 20)
    )
    samples = []
    for row in range(rows):
        for column in range(columns):
            x = (column - columns / 2) / horizontal_radius
            y = (row - center_row) / vertical_radius
            radius = hypot(x, y) + sin(x * 3 + y * 2) * 0.025
            samples.append((radius, column * 13 + row * 7))
    return columns, samples


def render_ascii_arches(time=0, mobile=False):
    """Dibuja un fotograma; time representa segundos de animación."""
    columns, samples = create_pattern(mobile)
    characters = []
    for index, (radius, texture) in enumerate(samples):
        phase = (radius + 0.08 - time * 0.07) % 0.66
        distance = abs(phase - 0.33)
        density = max(0, 1 - distance / 0.12)
        shimmer = 0.78 + sin(texture + time * 1.8) * 0.22
        characters.append(GLYPHS[int(density * shimmer * (len(GLYPHS) - 1))])
        if (index + 1) % columns == 0 and index < len(samples) - 1:
            characters.append("\n")
    return "".join(characters)
