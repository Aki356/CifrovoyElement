import { defineConfig } from 'vite'

export default defineConfig({
  base: '/CifrovoyElement/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  }
});
