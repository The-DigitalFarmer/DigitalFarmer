# DigitalFarmer

Portafolio personal de **Yerson Cabrera Landa**, enfocado en desarrollo backend,
APIs y automatización con Python.

El sitio combina HTML generado con Python y Jinja2 con interacciones escritas en
Python mediante PyScript. Se publica como una web estática y mantiene separados
el contenido, las plantillas, los estilos y la lógica del navegador.

[GitHub](https://github.com/The-DigitalFarmer) ·
[LinkedIn](https://www.linkedin.com/in/yerson-cabrera-88439b401/)

## Características

- Secciones de presentación, habilidades, enfoque de trabajo, proyectos,
  experiencia y contacto.
- Temas claro y oscuro con preferencia del sistema y elección guardada.
- Navegación adaptable con sección activa, cierre con Escape y acceso por teclado.
- Fondo ASCII animado que respeta el movimiento reducido y se pausa fuera de pantalla.
- Contenido y enlaces disponibles mientras carga PyScript o si el runtime falla.
- Datos editables en módulos Python y fuentes e imágenes servidas localmente.
- CSS organizado por componentes y compilado en dos hojas minificadas.

## Tecnologías

| Tecnología | Uso |
| --- | --- |
| Python 3.10+ | Generación del sitio, servidor de desarrollo y pruebas. |
| Jinja2 | Plantillas HTML con escape automático de contenido. |
| PyScript 2026.7.3 | Ejecución de Python en el navegador. |
| Pyodide 0.29.0 | Intérprete de Python sobre WebAssembly. |
| HTML y CSS | Estructura, diseño adaptable y temas. |
| RCSSmin | Minificación del CSS durante la compilación. |

Las dependencias de compilación están fijadas en [requirements.txt](requirements.txt).
El runtime del navegador se configura en [static/pyscript.json](static/pyscript.json).

## Ejecutar en local

Necesitas Python 3.10 o posterior y un navegador moderno. La primera carga de
las interacciones requiere conexión a los CDN de PyScript y jsDelivr.

### 1. Clonar el repositorio

```sh
git clone https://github.com/The-DigitalFarmer/DigitalFarmer.git
cd DigitalFarmer
```

### 2. Crear y activar el entorno virtual

En macOS o Linux:

```sh
python3 -m venv .venv
source .venv/bin/activate
```

En Windows con PowerShell:

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
```

### 3. Instalar dependencias e iniciar el servidor

```sh
python -m pip install -r requirements.txt
python serve.py
```

Abre [http://127.0.0.1:3000](http://127.0.0.1:3000).
El servidor regenera el sitio al recargar la página para mostrar los cambios en
datos, plantillas, estilos y módulos Python. Para detenerlo, pulsa `Ctrl+C`.

Puedes elegir otro puerto:

```sh
python serve.py --port 8000
```

## Estructura

```text
DigitalFarmer/
├── portfolio/
│   ├── data/              # Habilidades, enfoque, proyectos y experiencia
│   ├── site.py            # Metadatos, navegación y rutas de logos
│   └── styles.py          # Orden y compilación del CSS
├── templates/
│   ├── components/        # Cabecera, pie y elementos compartidos
│   ├── sections/          # Plantillas de las seis secciones
│   └── index.html         # Estructura principal
├── static/
│   ├── python/            # Navegación, temas, animación y gestión de eventos
│   ├── styles/            # CSS fuente y paletas
│   └── pyscript.json      # Intérprete y módulos del navegador
├── public/assets/         # Imágenes, logos, fuentes y sus licencias
├── docs/                  # Referencia visual y revisión de PyScript
├── tests/                 # Pruebas automatizadas
├── build.py               # Generación de dist/
├── serve.py               # Servidor de desarrollo
├── requirements.txt       # Dependencias de Python
└── vercel.json            # Configuración de despliegue
```

`dist/`, `.venv/` y `__pycache__/` son directorios locales generados y están
excluidos de Git.

## Personalizar

| Qué cambiar | Archivo o directorio |
| --- | --- |
| Título, descripción, enlaces y logos | [portfolio/site.py](portfolio/site.py) |
| Habilidades y nombres de herramientas | [portfolio/data/skills.py](portfolio/data/skills.py) |
| Enfoque de trabajo y enlace al CV | [portfolio/data/about.py](portfolio/data/about.py) |
| Proyectos, imágenes y enlaces | [portfolio/data/projects.py](portfolio/data/projects.py) |
| Experiencia | [portfolio/data/experience.py](portfolio/data/experience.py) |
| Textos y estructura de cada sección | [templates/sections/](templates/sections/) |
| Paleta clara y tipografía | [static/styles/theme.css](static/styles/theme.css) |
| Paleta oscura | [static/styles/theme-dark.css](static/styles/theme-dark.css) |
| Interacciones del navegador | [static/python/](static/python/) |

Para activar el botón del CV, asigna una URL pública a `CV_URL` en
`portfolio/data/about.py`. Los enlaces de proyecto con URL vacía se muestran
como pendientes.

En las habilidades, `name` es el nombre visible e `icon` identifica una entrada
de `TOOL_LOGOS`. Si el logo no está configurado o su archivo no existe, se muestra
solo el nombre de la herramienta.

Los estilos fuente permanecen legibles. `global.css` contiene las bases
compartidas y `sections.css` reúne tarjetas y paneles. Si agregas una hoja,
regístrala en `APP_STYLE_FILES` de `portfolio/styles.py`.

Al agregar un módulo Python para el navegador, impórtalo desde el código que lo
utiliza y registra su archivo en `static/pyscript.json`.
