# DigitalFarmer

Portafolio de Yerson construido con Next.js App Router, React y JavaScript.

## Desarrollo

Usa Node.js 24 o 26 y npm.

```sh
npm ci
npm run dev
```

Abre <http://localhost:3000>.

```sh
npm run build    # Compilación de producción
npm start        # Servir la compilación de producción
```

## Organización

- `src/app`: página principal, layout y metadatos.
- `src/sections`: las seis secciones del portafolio y sus datos.
- `src/components`: cabecera, pie y logos sociales compartidos.
- `src/styles`: estilos globales y reglas compartidas entre secciones.
- `public/assets`: imágenes, logos y fuentes locales.

La página se prerenderiza durante la compilación. Solo `Header` y
`HeroAtmosphere` son componentes de cliente: gestionan la navegación y la
animación ASCII. El resto se renderiza en el servidor. Los estilos de cada
sección usan clases específicas para conservar el diseño sin librerías de UI.

Los datos de proyectos, habilidades, experiencia y About están en los archivos
`data.js` de cada sección. Configura `cvUrl` en `src/sections/about/data.js` para
activar el enlace al CV.

Vercel utiliza el preset `nextjs` definido en `vercel.json`. La salida de
compilación está en `.next`; el directorio `dist` de Astro ya no se utiliza.

Referencia: [instalación de Next.js](https://nextjs.org/docs/app/getting-started/installation).
