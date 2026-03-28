import { getUserProfile, loginUser, updateUserProfile } from '../services/authService.js';

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

export async function getPerfilUsuario(req, res, next) {
  try {
    const { idUsuario } = req.params;
    const profile = await getUserProfile(idUsuario);

    res.json({
      ok: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}

export async function updatePerfilUsuario(req, res, next) {
  try {
    const { idUsuario } = req.params;
    const profile = await updateUserProfile({
      idUsuario,
      payload: req.body,
    });

    res.json({
      ok: true,
      message: 'Perfil actualizado correctamente.',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
}
