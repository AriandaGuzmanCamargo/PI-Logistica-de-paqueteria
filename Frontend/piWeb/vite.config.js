import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    {
      name: 'rewrite-piweb-urls',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Rewrite /piWeb/* to /*
          if (req.url?.startsWith('/piWeb/')) {
            req.url = req.url.replace('/piWeb', '');
          }
          // Serve images from the images/ directory
          if (req.url?.startsWith('/images/')) {
            const filePath = path.join(__dirname, req.url);
            if (fs.existsSync(filePath)) {
              return res.end(fs.readFileSync(filePath));
            }
          }
          next();
        });
      },
    },
  ],
  publicDir: false,
});
