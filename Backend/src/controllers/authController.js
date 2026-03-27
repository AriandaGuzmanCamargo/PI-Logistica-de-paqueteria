import { loginUser } from '../services/authService.js';

export async function login(req, res, next) {
  try {
    const { correo, contrasena, tipoAcceso } = req.body ?? {};

    const usuario = await loginUser({
      correo,
      contrasena,
      tipoAcceso,
    });

    res.json({
      ok: true,
      message: 'Login exitoso.',
      usuario,
    });
  } catch (error) {
    next(error);
  }
}
