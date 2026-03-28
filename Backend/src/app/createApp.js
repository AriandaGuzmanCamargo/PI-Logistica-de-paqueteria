import cors from 'cors';
import express from 'express';
import authRouter from '../routes/authRoutes.js';
import enviosRouter from '../routes/enviosRoutes.js';
import incidenciasRouter from '../routes/incidenciasRoutes.js';
import trackingRouter from '../routes/trackingRoutes.js';
import { errorHandler } from '../middlewares/errorHandler.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'pi-api' });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/envios', enviosRouter);
  app.use('/api/incidencias', incidenciasRouter);
  app.use('/api/tracking', trackingRouter);

  app.use(errorHandler);

  return app;
}
