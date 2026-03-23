import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import authRouter from './routes/authRoutes.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'piMobil-backend' });
});

app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Backend movil escuchando en http://localhost:${port}`);
});
