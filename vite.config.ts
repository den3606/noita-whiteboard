import { resolve } from 'path';
import crossOriginIsolation from 'vite-plugin-cross-origin-isolation';
export default {
  root: resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
  plugins: [
    crossOriginIsolation(),
  ],
  build: {
    outDir: '../dist',
    assetsDir: './'
  }
};
