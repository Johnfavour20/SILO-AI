import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const apiProxyPort = process.env.VITE_API_PROXY_PORT || '3005';

export default defineConfig(() => {
  const hmrEnabled = process.env.DISABLE_HMR !== 'true';

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': rootDir,
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: false,
      proxy: {
        '/api': {
          target: `http://localhost:${apiProxyPort}`,
          changeOrigin: true,
        },
      },
      hmr: hmrEnabled
        ? {
            host: 'localhost',
            port: 3000,
            clientPort: 3000,
          }
        : false,
      watch: hmrEnabled ? {} : null,
    },
  };
});
