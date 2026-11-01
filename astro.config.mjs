// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://spiget.org',
  trailingSlash: 'ignore',
  // Keep whitespace between inline elements ("by <a>…</a>") exactly as written
  compressHTML: false,
  build: {
    format: 'directory',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Bootstrap 5.3 still uses @import and global Sass functions.
          quietDeps: true,
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
        },
      },
    },
  },
});
