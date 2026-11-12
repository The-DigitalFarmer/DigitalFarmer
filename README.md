# DigitalFarmer

Portafolio de Yerson construido con Python, plantillas HTML y PyScript.
Conserva las seis secciones, el diseño adaptable y las imágenes locales del
portafolio, con una nueva paleta y tipografía basadas en aprenderust.dev.

## Desarrollo local

Requiere Python 3.10 o posterior.

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python serve.py
```

Abre <http://127.0.0.1:3000>. Cada recarga de la página vuelve a generar el sitio,
por lo que los cambios en datos, plantillas, estilos y módulos Python se ven al
actualizar el navegador. Detén el servidor con `Ctrl+C`.

Para usar otro puerto:

```sh
python serve.py --port 8000
```

## Cómo está organizado

| Ruta | Responsabilidad |
| --- | --- |
| `portfolio/data/` | Textos y datos de About, proyectos, habilidades y experiencia. |
| `portfolio/site.py` | Metadatos, navegación, enlaces sociales y rutas de logos. |
| `portfolio/styles.py` | Orden de las hojas CSS y compilación de los dos archivos publicados. |
| `templates/index.html` | Estructura general y orden de las secciones. |
| `templates/sections/` | Una plantilla HTML por sección. |
| `templates/components/` | Cabecera, pie, fondo ASCII y macro de logos sociales. |
| `static/python/navigation.py` | Menú móvil, cierre con Escape y sección activa al hacer scroll. |
| `static/python/atmosphere.py` | Reproducción de la animación; respeta movimiento reducido y visibilidad. |
| `static/python/theme.py` | Selector claro/oscuro, preferencia local y sincronización con el sistema. |
| `static/python/ascii_art.py` | Cálculo del dibujo ASCII, compartido por la compilación y el navegador. |
| `static/python/main.py` | Inicio, suspensión y reactivación de las interacciones con PyScript. |
| `static/python/browser_events.py` | Registro y desconexión de eventos con liberación de proxies. |
| `static/styles/` | CSS global y archivos separados para cada sección o componente. |
| `static/styles/theme.css` | Paleta clara, fuentes, radios y estados visuales compartidos. |
| `static/styles/theme-dark.css` | Paleta y estados del modo oscuro. |
| `static/pyscript.json` | Intérprete y módulos que PyScript carga en el navegador. |
| `public/assets/` | Imágenes, logos y fuentes. |
| `build.py` | Generación del sitio estático con Python y Jinja2. |
| `serve.py` | Servidor de desarrollo con regeneración al recargar. |
| `dist/` | Resultado generado para publicar; no se edita a mano. |

Para cambiar contenido, edita los diccionarios y listas de `portfolio/data/`.
Los nombres de habilidades están en `portfolio/data/skills.py`. El campo `icon`
identifica una entrada de `TOOL_LOGOS` en `portfolio/site.py`; ese mapa solo
contiene rutas de imágenes. Si el icono está vacío, no está configurado o su
archivo fue eliminado, se muestra el nombre de la habilidad sin imagen.

Para agregar un proyecto, copia una entrada de `portfolio/data/projects.py` y
actualiza sus datos y su imagen. Configura `CV_URL` en `portfolio/data/about.py`
para activar el botón del CV. Una URL de proyecto vacía muestra el enlace como
pendiente y lo retira de la navegación con teclado.

Los temas claro y oscuro toman la paleta y las fuentes de [aprenderust.dev](https://aprenderust.dev/).
La extracción y su aplicación están documentadas en [docs/design-reference.md](docs/design-reference.md).
Las fuentes se sirven localmente y sus licencias están en `public/assets/fonts/`.
Para cambiar colores o tipografías, edita `static/styles/theme.css` y sus valores
oscuros en `static/styles/theme-dark.css`.

El botón de sol/luna de la cabecera permite cambiar de tema y guarda la elección
en el navegador. Hasta elegir uno, el sitio sigue la preferencia del sistema,
también si cambia durante la visita. La hoja oscura usa una consulta de medios,
por lo que el tema del sistema funciona incluso sin PyScript. Al iniciarse Python,
se aplica cualquier elección guardada. El selector funciona sin persistencia si
el navegador bloquea el almacenamiento local.

Para cambiar el diseño, edita la plantilla y el CSS de la sección. Las plantillas
usan bucles y condiciones de Jinja2; los datos se escapan automáticamente al
generar HTML. La lógica de interacción está escrita en Python con nombres
descriptivos y comentarios en español.

Los tres componentes del navegador tienen métodos `start()` y `stop()`.
Iniciarlos varias veces no duplica eventos. Al salir de la página se desconectan
eventos y observadores, se cancelan fotogramas pendientes y se liberan los proxies
de Python. Al volver con Atrás/Adelante se reactivan. Si se retira el HTML de un
componente, su inicialización se omite y los demás siguen disponibles.
La navegación usa un único evento para el logo y los enlaces del menú.
Los elementos devueltos por el DOM se comprueban con `pyscript.ffi.is_none`,
que reconoce tanto `None` como `JsNull` del intérprete del navegador.
El resumen de la revisión está en [docs/pyscript-review.md](docs/pyscript-review.md).

El CSS de `static/styles/` permanece legible. `global.css` contiene las bases de
botones, títulos e iconos; `sections.css` comparte tarjetas y paneles. Cada sección
conserva sus reglas particulares. Las tarjetas de proyectos están en `projects.css`.
Al agregar una hoja, inclúyela en `APP_STYLE_FILES` de `portfolio/styles.py`.

La compilación utiliza RCSSmin y genera únicamente dos hojas: `app.<hash>.min.css`
y `dark.<hash>.min.css`. La segunda sigue siendo conmutable con el selector de tema.
El hash cambia cuando cambia el contenido, evitando reutilizar estilos obsoletos.
Las hojas antiguas de `dist/styles/` se retiran automáticamente. Edita siempre los
archivos fuente; no los `.min.css` generados.

## Qué ejecuta el navegador

`build.py` genera todo el contenido como HTML antes de publicarlo. La página y
sus enlaces ya se pueden usar mientras carga Python, incluso si PyScript no
llega a estar disponible. En móvil, la navegación se muestra directamente hasta
que se activa el menú interactivo.

[PyScript 2026.7.3](https://pyscript.net/releases/2026.7.3/) carga Python en el
navegador mediante Pyodide 0.29.0. Python controla el DOM, los eventos y la
animación. No se necesita un servidor Python en producción. La primera visita
descarga el runtime desde los CDN de PyScript y jsDelivr, por lo que las
interacciones requieren conexión a esos servicios. Los estilos, fuentes,
imágenes y el primer fotograma ASCII se sirven con el sitio.

Las versiones están fijadas en `portfolio/site.py` y `static/pyscript.json`.
Consulta la [configuración oficial de PyScript](https://docs.pyscript.net/2026.7.3/user-guide/configuration/)
antes de actualizar el intérprete o agregar módulos al navegador.

## Compilar y publicar

Con el entorno virtual activo:

```sh
python build.py
```

Publica el contenido de `dist/` en un alojamiento estático. Las rutas de recursos
parten de `/`, por lo que el sitio debe servirse en la raíz del dominio.
El servidor de desarrollo solo expone `dist/`, no las plantillas ni los datos
de compilación.

`vercel.json` configura la instalación con pip, la compilación con Python y la
salida `dist/`. El preset de framework es `null`. Si el proyecto de Vercel tiene
ajustes manuales anteriores, usa esos mismos valores al desplegar. No se ha
realizado ningún despliegue desde esta migración.

## Verificaciones

```sh
python -m unittest discover -s tests -v
```

Las pruebas verifican la generación del HTML, los recursos y enlaces internos,
el escape de contenido, los estados del CV y de los enlaces pendientes, el
generador ASCII, la compilación del CSS con sus hashes y la correspondencia entre
los módulos usados y la configuración de PyScript. Para revisar las
interacciones, inicia `serve.py` y comprueba
el menú móvil, Escape, la sección activa al desplazarte, el selector de tema,
la persistencia al recargar y la preferencia de movimiento reducido del navegador.
