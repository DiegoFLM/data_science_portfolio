import { defineConfig } from 'vite'
import path from 'path';

export default defineConfig({
  root: 'src/',
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.html'),
        about: path.resolve(__dirname, 'src/pages/about/about.html'),
        contact: path.resolve(__dirname, 'src/pages/contact/contact.html'),
        // styles: path.resolve(__dirname, 'src/styles.css'),
      },
      refresh: true,
    },
    outDir: 'dist'
  }
});