import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    process.env.NODE_ENV === 'production' &&
      viteStaticCopy({
        targets: [
          {
            src: './src/assets',
            dest: 'src/',
          },
        ],
      }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
    cors: false,
  },
});
