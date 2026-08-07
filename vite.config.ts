import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// Load vercel.json env into process.env if available
try {
  const vercelJsonPath = path.resolve(process.cwd(), 'vercel.json');
  if (fs.existsSync(vercelJsonPath)) {
    const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf-8'));
    if (vercelConfig.env) {
      Object.assign(process.env, vercelConfig.env);
    }
  }
} catch (e) {
  console.error('Error loading vercel.json env:', e);
}

function apiPlugin() {
  return {
    name: 'api-plugin',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        const apiName = parsedUrl.pathname.replace('/api/', '').split('/')[0];

        try {
          const mod = await server.ssrLoadModule(`./api/${apiName}.js`);
          const handler = mod.default;

          if (!handler) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'API handler not found' }));
            return;
          }

          // Parse query
          const query: Record<string, string> = {};
          parsedUrl.searchParams.forEach((val, key) => {
            query[key] = val;
          });
          req.query = query;

          // Parse body if present
          if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method || '')) {
            const buffers: Uint8Array[] = [];
            for await (const chunk of req) {
              buffers.push(chunk);
            }
            const data = Buffer.concat(buffers).toString();
            try {
              req.body = data ? JSON.parse(data) : {};
            } catch {
              req.body = data;
            }
          } else {
            req.body = {};
          }

          // Express-style res helpers
          res.status = function (statusCode: number) {
            res.statusCode = statusCode;
            return res;
          };
          res.json = function (jsonBody: any) {
            if (!res.headersSent) {
              res.setHeader('Content-Type', 'application/json');
            }
            res.end(JSON.stringify(jsonBody));
            return res;
          };
          res.send = function (data: any) {
            res.end(data);
            return res;
          };

          await handler(req, res);
        } catch (err: any) {
          console.error(`API Error on ${req.url}:`, err);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
          }
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins: any[] = [react(), tailwindcss(), apiPlugin()];
  try {
    // @ts-ignore
    const m = await import('./.vite-source-tags.js');
    plugins.push(m.sourceTags());
  } catch {}

  const env = loadEnv(mode, process.cwd(), ['VITE_', 'NEXT_PUBLIC_']);
  const processEnvDefines: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(value);
  }

  return {
    plugins,
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    define: processEnvDefines,
  };
});
