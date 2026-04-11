import {
  deleteManagedUserByAdmin,
  createManagedUserByAdmin,
  changePassword,
  changePasswordByAdmin,
  getUserProfile,
  listManageableUsersForAdmin,
  loginUser,
  registerUser,
  requestPasswordRecovery,
  updateUserProfile,
  recoverPasswordByEmail,
} from '../services/authService.js';

export async function login(req, res, next) {
  try {
    const { correo, contrasena, tipoAcceso, origenAplicacion } = req.body ?? {};

    const data = await loginUser({
      correo,
      contrasena,
      tipoAcceso,
      origenAplicacion,
    });

    res.json({
      ok: true,
      message: 'Login exitoso.',
      usuario: data.usuario,
      token: data.token,
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

export async function register(req, res, next) {
  try {
    const data = await registerUser(req.body ?? {});

    res.status(201).json({
      ok: true,
      message: 'Cuenta creada correctamente.',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function recoverPassword(req, res, next) {
  try {
    const data = await requestPasswordRecovery(req.body ?? {});

    res.json({
      ok: true,
      message: data.message,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function updatePassword(req, res, next) {
  try {
    const { idUsuario } = req.params;

    const data = await changePassword({
      idUsuario,
      payload: req.body ?? {},
    });

    res.json({
      ok: true,
      message: 'Contrasena actualizada correctamente.',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUsuariosGestionAdmin(req, res, next) {
  try {
    const { idAdmin, rol } = req.query;
    const data = await listManageableUsersForAdmin({
      idAdmin,
      rol,
    });

    res.json({
      ok: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function updatePasswordByAdmin(req, res, next) {
  try {
    const { idUsuario } = req.params;
    const { idAdmin, ...payload } = req.body ?? {};

    const data = await changePasswordByAdmin({
      idAdmin,
      idUsuarioObjetivo: idUsuario,
      payload,
    });

    res.json({
      ok: true,
      message: 'Contrasena del usuario actualizada por admin.',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function createUsuarioByAdmin(req, res, next) {
  try {
    const { idAdmin, ...payload } = req.body ?? {};

    const data = await createManagedUserByAdmin({
      idAdmin,
      payload,
    });

    res.status(201).json({
      ok: true,
      message: 'Usuario creado correctamente por admin.',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteUsuarioByAdmin(req, res, next) {
  try {
    const { idUsuario } = req.params;
    const { idAdmin } = req.body ?? {};

    const data = await deleteManagedUserByAdmin({
      idAdmin,
      idUsuarioObjetivo: idUsuario,
    });

    res.json({
      ok: true,
      message: 'Usuario eliminado correctamente por admin.',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function recoverPasswordByEmailHandler(req, res, next) {
  try {
    const { correo, nuevaContrasena, confirmarContrasena } = req.body ?? {};

    const data = await recoverPasswordByEmail({
      correo,
      nuevaContrasena,
      confirmarContrasena,
    });

    res.json({
      ok: true,
      message: 'Contraseña recuperada correctamente.',
      data,
    });
  } catch (error) {
    next(error);
  }
}
