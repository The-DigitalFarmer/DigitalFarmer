# DigitalFarmer · Portafolio

Portafolio estático con Astro y TypeScript. Incluye inicio, habilidades, sobre mí, proyectos, experiencia y contacto. Home combina el retrato pixel art con un fondo de atmósfera digital; Contacto conserva su diseño pixel art. Las secciones centrales comparten componentes y estilos ligeros. La página funciona sin React ni hidratación de componentes.

## Desarrollo

Requiere Node.js 22.23.4 o superior y npm.

```sh
npm ci
npm run dev
```

Astro muestra la dirección local al arrancar, normalmente `http://localhost:4321`.

```sh
npm run check    # Verificación de tipos y componentes Astro
npm run build    # Genera el sitio estático en dist/
npm run preview  # Sirve la compilación para revisarla
```

Publica el contenido de `dist/` en un alojamiento de archivos estáticos. No publiques el código fuente ni `node_modules/`.

## Arquitectura

```text
src/
├── pages/index.astro         # Composición de las seis secciones
├── layouts/BaseLayout.astro # Documento, metadatos y estructura común
├── sections/                # Hero, Skills, About, Projects, Experience y Contact
├── components/              # Cabecera, atmósfera de Home, footer y vistas de proyectos
│   └── ui/                  # Icon y StackMascot
├── data/portfolio.ts        # Herramientas, enfoque, proyectos y experiencia
├── assets/                  # Todos los recursos, organizados por sección
│   ├── home/                # Retrato y textura de fondo
│   ├── skills/logos/        # Logos originales de las herramientas
│   ├── projects/            # Ilustraciones vintage de proyectos
│   ├── contact/             # Ilustración de contacto
│   ├── footer/              # Imagen del enlace al inicio
│   └── shared/              # Mascota, iconos sociales y fuentes
├── scripts/                 # Navegación activa
└── styles/
    ├── global.css           # Reset, fuentes, paleta y controles pixel art
    └── shared.css           # Fondos y componentes centrales compartidos
```

## Editar contenido y estilos

- `src/data/portfolio.ts` contiene los datos tipados de habilidades, proyectos y experiencia. Por ahora, `repositoryUrl` y `websiteUrl` de los tres proyectos apuntan al perfil de GitHub de The-DigitalFarmer; pueden reemplazarse por el repositorio y la web de cada proyecto.
- `cvUrl` en `src/data/portfolio.ts` configura el enlace del botón «Ver CV» de About. Mientras esté vacío, el botón permanece desactivado; al agregar una URL, la abre en una pestaña nueva.
- Cada sección y componente visual contiene su CSS específico en un bloque `<style>` aislado por Astro.
- `BaseLayout` separa Home mediante un slot `home` a todo el ancho. El resto de secciones y el footer comparten el marco centrado `content-frame`, con bordes laterales continuos y separadores horizontales.
- `global.css` define `--frame-width`, `--page-gutter` y `--section-gutter` para ajustar el contenedor desde un único lugar. `--home-peek` reserva parte de la primera pantalla para mostrar el comienzo de Skills.
- La cabecera permanece visible al hacer scroll. `--anchor-offset` mantiene los títulos por debajo de la navegación al utilizar los enlaces de sección.
- `global.css` conserva las bases utilizadas por inicio y contacto; personaliza las secciones centrales mediante sus estilos propios y `shared.css`.
- `HeroAtmosphere` define el fondo estático de Home: base ciruela, luz verde `#4fc8ae` detrás del retrato, acento naranja tenue y grano fino. En móvil, la iluminación acompaña al retrato en la parte inferior. El fondo utiliza CSS y una textura SVG local.
- `content-grid` ajusta las columnas con `auto-fit` y `minmax`. Los ajustes de pantalla se mantienen limitados a los cambios de composición necesarios.
- Projects muestra tres tarjetas contiguas con imagen, categoría, título y descripción. En móvil se apilan en una columna. Las imágenes y los títulos no abren ventanas. «Ver todos» abre los repositorios de GitHub. Los botones «Repositorio» y «Ver web» se configuran mediante `repositoryUrl` y `websiteUrl` de cada proyecto en `src/data/portfolio.ts`: sin URL permanecen visibles e inactivos; con URL abren el destino en una pestaña nueva.
- `ProjectPreview` presenta las tres ilustraciones en formato panorámico sin esquinas redondeadas. Sus imágenes y textos alternativos se editan en `portfolio.ts`.
- Las imágenes fuente viven en `src/assets/projects/`. Astro genera WebP con varios anchos y carga diferida.
- Todos los recursos viven en `src/assets/`, divididos por sección; los compartidos se guardan en `shared/`. Los componentes los importan y las hojas de estilo utilizan rutas relativas. Astro y Vite resuelven las URLs de producción, sin referencias manuales a `/assets/`.
- La dirección visual y los prompts de generación están documentados en [docs/project-artwork-vintage.md](docs/project-artwork-vintage.md).
- La mascota SVG compartida vive en `src/assets/shared/stack-mascot.svg`; la ilustración del footer en `src/assets/footer/ornitorrinco-fondo-salvia.png`. Se conservan únicamente los recursos activos, sin copias de exportación ni propuestas descartadas.
- `Icon` muestra los logos originales del stack desde `src/assets/skills/logos/`, respetando sus proporciones y colores. Las fuentes oficiales de cada archivo están documentadas en [docs/stack-logos.md](docs/stack-logos.md). Los iconos sociales de inicio y contacto conservan sus máscaras SVG en `src/assets/shared/icons/`.
- Los scripts se importan desde sus componentes y Astro los compila como módulos. Los comportamientos de navegador son la navegación activa y la actualización del año del footer.

El proyecto genera una única ruta `/`; la navegación entre secciones utiliza los enlaces `#inicio`, `#habilidades`, `#sobre-mi`, `#proyectos`, `#experiencia` y `#contacto`. Skills contiene el diagrama Stack y About presenta Deep Focus en una cuadrícula de cuatro tarjetas, con una columna de introducción y el enlace al CV. En móvil, la cuadrícula se apila en una sola columna.
