import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: path.resolve(__dirname, '../src'),
    //emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/main.ts'),
      output: {

        entryFileNames: 'public/admin/js/main.js',
        assetFileNames: (asset) => {
          // Organize assets based on file type
          if (asset.name.endsWith('.css')) {
            return `public/admin/css/${asset.name}`;
          } else if (
              asset.name.endsWith('.eot') ||
              asset.name.endsWith('.ttf') ||
              asset.name.endsWith('.woff') ||
              asset.name.endsWith('.woff2')
          ) {
            return `public/admin/fonts/${asset.name}`;
          } else if (
              asset.name.endsWith('.cvg') ||
              asset.name.endsWith('.png') ||
              asset.name.endsWith('.jpg') ||
              asset.name.endsWith('.webp')
          ) {
            return `public/admin/img/${asset.name}`;
          } else if (asset.name.endsWith('.js')) {
            return `public/admin/js/${asset.name}`;
          }
          // For other file types, use the default output format with hash
          return `public/admin/${asset.name}`;
          /*if (ext === '.css') {
            return 'main.css'
          }
          return '[name][extname]'*/
        },
      },
    },
  },
})
