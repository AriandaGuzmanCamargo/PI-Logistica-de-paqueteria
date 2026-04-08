import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import asignacionesRouter from './routes/asignacionesRoutes.js';
import authRouter from './routes/authRoutes.js';
import direccionesRouter from './routes/direccionesRoutes.js';
import enviosRouter from './routes/enviosRoutes.js';
import incidenciasRouter from './routes/incidenciasRoutes.js';
import notificacionesRouter from './routes/notificacionesRoutes.js';
import trackingRouter from './routes/trackingRoutes.js';
import { errorHandler } from './Middelware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '0.0.0.0';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'pi-api' });
});

app.use('/api/auth', authRouter);
app.use('/api/asignaciones', asignacionesRouter);
app.use('/api/direcciones', direccionesRouter);
app.use('/api/envios', enviosRouter);
app.use('/api/incidencias', incidenciasRouter);
app.use('/api/notificaciones', notificacionesRouter);
app.use('/api/tracking', trackingRouter);

app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});