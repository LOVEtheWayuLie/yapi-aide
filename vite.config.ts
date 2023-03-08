import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn } from 'vite-plugin-monkey';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        name: 'yapi-aide',
        namespace: 'yapi-aide',
        match: ['http://yapi.linzhou.link/**'],
      },
      build: {
        externalGlobals: {
          vue: [
            'Vue',
            (version) =>
              `https://cdn.jsdelivr.net/npm/vue@${version}/dist/vue.global.prod.js`,
          ],
        },
      },
    }),
  ],
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/styles/variable.less";',
      },
    },
  },
});
