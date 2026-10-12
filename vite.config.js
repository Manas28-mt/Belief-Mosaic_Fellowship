import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Local dev middleware to execute /api serverless functions
function apiPlugin() {
  return {
    name: 'api-server-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) {
          return next();
        }

        const urlPath = req.url.split('?')[0];
        const endpoint = urlPath.replace('/api/', '');

        try {
          const chunks = [];
          for await (const chunk of req) {
            chunks.push(chunk);
          }
          const rawBuffer = Buffer.concat(chunks);
          const contentType = req.headers['content-type'] || '';

          if (contentType.includes('application/json') && rawBuffer.length > 0) {
            try {
              req.body = JSON.parse(rawBuffer.toString('utf8'));
            } catch {
              req.body = {};
            }
          } else {
            req.body = rawBuffer;
          }

          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return res;
          };

          const handlerModule = await server.ssrLoadModule(`./api/${endpoint}.js`);
          if (handlerModule && handlerModule.default) {
            await handlerModule.default(req, res);
          } else {
            res.status(404).json({ error: 'Endpoint not found' });
          }
        } catch (err) {
          console.error('[API Middleware Error]', err);
          res.status(500).json({ error: err.message || 'Internal Server Error' });
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    apiPlugin(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      injectManifest: {
        injectionPoint: 'self.__WB_MANIFEST',
      },
      manifest: {
        name: 'Belief',
        short_name: 'Belief',
        description: 'Keep your belief in yourself intact.',
        display: 'standalone',
        theme_color: '#F6B92B',
        background_color: '#FBF5E6',
        start_url: '/',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
  },
})

