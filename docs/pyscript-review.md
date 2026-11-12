# Revisión de PyScript

Revisión realizada el 11 de noviembre de 2026 sobre PyScript 2026.7.3 y
Pyodide 0.29.0, manteniendo las versiones fijadas del proyecto.

## Cambios

- Las comprobaciones de elementos ausentes usan `pyscript.ffi.is_none`.
  Pyodide puede devolver `JsNull`; se comprobó retirando elementos en el navegador.
- `start()` no vuelve a registrar un componente que ya está activo.
- `stop()` desconecta eventos y observadores, cancela fotogramas pendientes y
  destruye los proxies de los componentes.
- `main.py` suspende los componentes en `pagehide` y los reactiva en `pageshow`.
- Navegación delega el cierre por enlaces y clic exterior en un solo evento.
- Temas reconoce también el evento con clave nula producido por
  `localStorage.clear()` en otra pestaña.
- Se retiraron las listas de callbacks duplicadas, los eventos por enlace,
  el marcador de paquete vacío del navegador y la clase `content-frame--end`.

Navegación, temas y animación siguen en uso. El generador ASCII se comparte con
la compilación para conservar un primer fotograma sin depender del runtime.
`browser_events.py` centraliza la conexión y liberación de eventos.

## Verificación

Las 13 pruebas de Python verifican compilación, recursos, estilos, datos,
generación ASCII, liberación de eventos y dependencias de los módulos publicados.

En un navegador Chromium con el runtime real se comprobaron:

- Menú móvil, enlaces, clic exterior, Escape, foco y navegación activa.
- Ambos temas, preferencia del sistema, persistencia y sincronización entre pestañas.
- Almacenamiento bloqueado y borrado completo de preferencias.
- Animación, pausa fuera de pantalla, visibilidad y movimiento reducido.
- Inicio repetido diez veces sin duplicación de eventos.
- Cancelación de trabajo pendiente y desconexión de componentes.
- Regreso a la página con Atrás/Adelante.
- Ausencia de cabecera, selector, fondo animado, sección enlazada o año del pie.
- Anchos de 320, 390, 768, 1024 y 1440 px y contenido utilizable sin PyScript.

Las pruebas del navegador se ejecutaron durante esta revisión. La suite de
Python queda en `tests/` y se ejecuta con:

```sh
python -m unittest discover -s tests -v
```

## Referencias

- [FFI de PyScript](https://docs.pyscript.net/2026.7.3/api/ffi/)
- [Ciclo de vida de proxies de Pyodide](https://pyodide.org/en/0.29.0/usage/api/python-api/ffi.html#pyodide.ffi.create_proxy)
- [Configuración de archivos de PyScript](https://docs.pyscript.net/2026.7.3/user-guide/configuration/)
