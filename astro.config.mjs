import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    assets: 'assets',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
      rolldownOptions: {
        output: {
          assetFileNames: ({ names }) => names.some(name => name.endsWith('.css'))
            ? 'assets/styles.css'
            : 'assets/[name][extname]',
          entryFileNames: ({ name }) => `assets/${name.split('.astro')[0].toLowerCase()}.[hash].js`,
        },
      },
    },
  },
});
