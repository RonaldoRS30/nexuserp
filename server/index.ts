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
    contentSecurityPolicy: env.shareMode ? false : undefined,
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

if (env.shareMode || env.isProd) {
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      next();
      return;
    }
    res.sendFile(path.join(clientDist, 'index.html'), (error) => {
      if (error) next(error);
    });
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
