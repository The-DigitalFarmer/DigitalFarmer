# Assets

Los recursos se organizan por formato:

- `svg/`: ilustraciones y logos vectoriales.
- `png/`: imágenes rasterizadas.
- `fonts/`: fuentes WOFF2 y sus licencias SIL Open Font License.

## Tipografías

Fuentes extraídas de los recursos públicos de [aprenderust.dev](https://aprenderust.dev/)
el 11 de noviembre de 2026, conservadas como archivos locales sin modificaciones:

- Fira Sans: pesos 400, 500, 600 y 700 para textos y controles.
- Fira Mono: pesos 400 y 500 para etiquetas y animación ASCII.
- Alfa Slab One: peso 400 para títulos y marca.

Las declaraciones `@font-face` están en `static/styles/theme.css`.
Las licencias provienen del repositorio oficial de Google Fonts:
[Fira Sans](https://github.com/google/fonts/blob/main/ofl/firasans/OFL.txt),
[Fira Mono](https://github.com/google/fonts/blob/main/ofl/firamono/OFL.txt) y
[Alfa Slab One](https://github.com/google/fonts/blob/main/ofl/alfaslabone/OFL.txt).

## Logos sociales

SVG locales utilizados por la macro `social_logo` de `templates/components/macros.html`. El logo `svg/github.svg` también se reutiliza en `templates/sections/skills.html`; su ruta está en `portfolio/site.py`. Se conservan las formas y los colores de las fuentes oficiales; no se aplican máscaras CSS ni degradados adicionales.

| Archivo | Fuente oficial | Recurso |
| --- | --- | --- |
| `svg/github.svg` | [GitHub Brand Toolkit](https://brand.github.com/foundations/logo) | `GitHub_Logos.zip` → `GitHub Logos/SVG/GitHub_Invertocat_White.svg` |
| `svg/linkedin.svg` | [LinkedIn Brand Downloads](https://brand.linkedin.com/downloads) | Símbolo SVG `inbug-blue-28` publicado en esa página, extraído como SVG independiente conservando sus trazados y color. |
| `svg/whatsapp.svg` | [WhatsApp Brand Resource Center](https://www.meta.com/brand/resources/whatsapp/whatsapp-brand/) | `WhatsApp-Brand-Resource-Center.zip` → `01_Glyph/01_Digital RGB/03_SVG/Digital_Glyph_Green_RGB_2026.svg` |

Los logos pertenecen a sus respectivas marcas. Se usan para identificar los enlaces a esos servicios.
