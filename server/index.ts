import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { pingDatabase } from './config/database';
import { ensureSettingsTable } from './models/Settings';
import routes from './routes';
import { errorHandler, notFound } from './middlewares/errorHandler';
import { globalLimiter } from './middlewares/rateLimiter';

const app = express();
const clientDist = path.resolve(__dirname, '../client/dist');

app.set('trust proxy', 1);
app.use(
  helmet({
    contentSecurityPolicy: env.shareMode
      ? false
      : {
          directives: {
            // Over plain HTTP this directive makes browsers request assets via https and fail
            upgradeInsecureRequests: env.frontendUrl.startsWith('https://') ? [] : null,
          },
        },
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);
app.use(
  cors({
    origin: env.shareMode ? true : env.frontendUrl,
    credentials: true,
  }),
);
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(globalLimiter);

app.use('/api', routes);

interface SeoPages {
  pages: Record<string, string>;
  notFound: string;
  redirects: Record<string, string>;
}

function loadSeoPages(): SeoPages | null {
  try {
    return JSON.parse(fs.readFileSync(path.join(clientDist, 'seo-pages.json'), 'utf8')) as SeoPages;
  } catch {
    return null;
  }
}

if (env.shareMode || env.isProd) {
  const seo = loadSeoPages();
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || path.extname(req.path)) {
      next();
      return;
    }
    const sendIndex = () =>
      res.sendFile(path.join(clientDist, 'index.html'), (error) => {
        if (error) next(error);
      });
    if (!seo) {
      sendIndex();
      return;
    }

    const routePath = req.path.replace(/\/+$/, '') || '/';
    const query = req.originalUrl.slice(req.path.length);
    const redirectTo = seo.redirects[routePath] ?? (routePath !== req.path ? routePath : null);
    if (redirectTo) {
      res.redirect(301, `${redirectTo}${query}`);
      return;
    }
    const html = seo.pages[routePath] ?? (routePath.startsWith('/admin') ? seo.pages['/admin'] : undefined);
    if (html) {
      res.type('html').send(html);
      return;
    }
    res.status(404).type('html').send(seo.notFound);
  });
}

app.use(notFound);
app.use(errorHandler);

async function start() {
  await pingDatabase();
  await ensureSettingsTable();
  app.listen(env.port, '0.0.0.0', () => {
    console.log(`NexusERP API lista en http://localhost:${env.port}`);
    if (env.shareMode || env.isProd) {
      console.log(`Sitio listo para compartir en el puerto ${env.port}`);
    }
  });
}

start().catch((error) => {
  console.error('No se pudo iniciar el servidor:', error);
  process.exit(1);
});
