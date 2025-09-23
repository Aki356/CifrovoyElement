import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  root: '.',
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'https://httpbingo.org',
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/mixins.scss" as *;\n',
      },
    },
  },
  build: { outDir: 'dist', emptyOutDir: true, sourcemap: false },
});
