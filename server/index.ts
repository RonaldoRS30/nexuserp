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

app.set('trust proxy', 1);
app.use(helmet());
app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  }),
);
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(globalLimiter);

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

async function start() {
  await pingDatabase();
  await ensureSettingsTable();
  app.listen(env.port, () => {
    console.log(`NexusERP API lista en http://localhost:${env.port}`);
  });
}

start().catch((error) => {
  console.error('No se pudo iniciar el servidor:', error);
  process.exit(1);
});
