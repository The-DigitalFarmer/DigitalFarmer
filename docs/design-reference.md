# Tema visual

Referencia: [aprenderust.dev](https://aprenderust.dev/), inspeccionada el
11 de noviembre de 2026 mediante su CSS y los estilos calculados del navegador.

## Paleta clara extraída

| Uso | Valor |
| --- | --- |
| Fondo principal / tarjetas | `#ffffff` |
| Panel piedra | `#fafaf9` |
| Texto principal | `#1c1917` |
| Texto secundario | `#57534e` |
| Texto tenue | `#6b635d` |
| Bordes | `#e7e5e4` |
| Naranja de marca | `#f74c00` |
| Botón principal | `#c2410c` |
| Hover principal | `#9a3412` |
| Fondo de acento | `#fff4ed` |
| Borde de acento | `#fed7aa` |
| Selección | `#ffd8c2` |
| Cierre oscuro / texto | `#1c1917` / `#ece6e0` |

## Paleta oscura extraída

Los valores se comprobaron activando el selector de la referencia y midiendo
el estado normal y el hover en el navegador.

| Uso | Valor |
| --- | --- |
| Fondo principal | `#0d0b0a` |
| Panel | `#110f0d` |
| Tarjetas | `#141210` |
| Superficie hover | `#1a1714` |
| Texto principal | `#ece6e0` |
| Texto secundario | `#b0a69e` |
| Texto tenue | `#9c928a` |
| Borde normal / fuerte | `#262220` / `#332e2a` |
| Borde hover secundario | `#57504a` |
| Botón principal / texto | `#f74c00` / `#0d0b0a` |
| Hover del botón principal | `#ff6a1f` |
| Acento hover / tinta | `#ff8a4c` / `#ffb38a` |
| Fondo de acento | `#f74c001f` |
| Selección | `#f74c0059`, texto blanco |
| Cuadrícula | `#ece6e00d` |

El botón oscuro usa una sombra naranja de 14 px. Los botones secundarios
cambian a `#1a1714` al pasar el cursor. El selector usa texto `#ff8a4c`,
fondo `#f74c001a` y borde `#f74c0066` durante el hover.

## Tipografía y estados

Alfa Slab One 400: títulos. Fira Sans 400–700: texto y botones.
Fira Mono 400–500: etiquetas. Jersey 15 aparece en la numeración lateral de
la referencia y VT323 está declarada; no tienen un componente equivalente aquí.

Botones: radio `.6rem`, transición de color de 150 ms, sin desplazamiento.
Secundarios: borde hover `#a8a29e`. Tarjetas: radios de 16–20 px.
Foco: contorno de 2 px con separación de 3 px.
Hero: cuadrícula de 32 px; paneles con iluminación radial naranja suave.

## Aplicación

`static/styles/theme.css` centraliza el tema claro y las fuentes;
`static/styles/theme-dark.css` contiene los valores oscuros. El selector de la
cabecera ejecuta `static/python/theme.py` con PyScript. Sigue al sistema hasta
que se guarda una elección y sincroniza otras pestañas. Sin almacenamiento,
la elección sigue funcionando durante la visita. Antes de iniciar Python,
el CSS aplica el tema del sistema; la elección guardada se restaura al iniciar.

Los componentes conservan el contenido y la animación Python. Contacto adopta
el cierre de la referencia y ajusta su fondo y borde según el tema.
Las fuentes son locales y conservan sus licencias OFL en `public/assets/fonts/`.
