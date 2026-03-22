import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { pool } from './db.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/auth/login', async (req, res) => {
  const { correo, contrasena } = req.body ?? {};

  if (!correo || !contrasena) {
    return res.status(400).json({
      ok: false,
      message: 'Correo y contrasena son obligatorios.',
    });
  }

  try {
    const result = await pool.query(
      `SELECT id_usuario, nombre, apellido, correo, contrasena, rol, estado
       FROM usuarios
       WHERE correo = $1
       LIMIT 1`,
      [correo]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({
        ok: false,
        message: 'Credenciales invalidas.',
      });
    }

    const usuario = result.rows[0];

    if (usuario.estado !== 'activo') {
      return res.status(403).json({
        ok: false,
        message: 'Usuario inactivo.',
      });
    }

    if (usuario.contrasena !== contrasena) {
      return res.status(401).json({
        ok: false,
        message: 'Credenciales invalidas.',
      });
    }

    return res.json({
      ok: true,
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      ok: false,
      message: 'Error interno del servidor.',
    });
  }
});

app.listen(port, () => {
  console.log(`Backend escuchando en http://localhost:${port}`);
});
