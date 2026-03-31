import {
  disableConductorByUserId,
  disableUserById,
  createConductorFromUser,
  createClientFromUser,
  createOperationalUser,
  createUser,
  findUserByEmail,
  findUserById,
  findUserProfileById,
  listManageableUsersByRoles,
  updateUserPasswordById,
  updateClientCityByUser,
  updateUserPhotoById,
  updateUserProfileById,
} from '../repositories/authRepository.js';

const ACCESS_ROLE_MAP = {
  usuario: 'cliente',
  chofer: 'conductor',
  repartidor: 'conductor',
};

const WEB_ALLOWED_ROLES = new Set(['supervisor', 'operador', 'admin', 'administrador']);

export async function loginUser({ correo, contrasena, tipoAcceso, origenAplicacion }) {
  if (!correo || !contrasena) {
    const error = new Error('Correo y contrasena son obligatorios.');
    error.statusCode = 400;
    throw error;
  }

  const usuario = await findUserByEmail(correo);

  if (!usuario) {
    const error = new Error('Credenciales invalidas.');
    error.statusCode = 401;
    throw error;
  }

  if (usuario.estado !== 'activo') {
    const error = new Error('Usuario inactivo.');
    error.statusCode = 403;
    throw error;
  }

  if (usuario.contrasena !== contrasena) {
    const error = new Error('Credenciales invalidas.');
    error.statusCode = 401;
    throw error;
  }

  const origenNormalizado = String(origenAplicacion || '').trim().toLowerCase();

  if (tipoAcceso) {
    const accesoNormalizado = String(tipoAcceso).trim().toLowerCase();
    const rolSolicitado = ACCESS_ROLE_MAP[accesoNormalizado];

    if (!rolSolicitado) {
      const error = new Error('Tipo de acceso no valido. Usa usuario o chofer.');
      error.statusCode = 400;
      throw error;
    }

    if (usuario.rol !== 'cliente' && usuario.rol !== 'conductor') {
      const error = new Error('Este rol no tiene acceso desde la app movil.');
      error.statusCode = 403;
      throw error;
    }

    if (usuario.rol !== rolSolicitado) {
      const error = new Error('El tipo de acceso no coincide con el rol del usuario.');
      error.statusCode = 403;
      throw error;
    }
  } else if (origenNormalizado === 'mobile' || origenNormalizado === 'movil') {
    if (usuario.rol !== 'cliente' && usuario.rol !== 'conductor') {
      const error = new Error('Este rol no tiene acceso desde la app movil.');
      error.statusCode = 403;
      throw error;
    }
  } else if (!WEB_ALLOWED_ROLES.has(String(usuario.rol || '').trim().toLowerCase())) {
    const error = new Error('Solo administradores, supervisores y operadores pueden ingresar al sistema web.');
    error.statusCode = 403;
    throw error;
  }

  return {
    id_usuario: usuario.id_usuario,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    correo: usuario.correo,
    rol: usuario.rol,
  };
}

export async function getUserProfile(idUsuario) {
  const parsedId = Number(idUsuario);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    const error = new Error('El id de usuario no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const profile = await findUserProfileById(parsedId);

  if (!profile) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  return {
    id_usuario: profile.id_usuario,
    nombre: profile.nombre,
    apellido: profile.apellido,
    correo: profile.correo,
    telefono: profile.telefono,
    fecha_registro: profile.fecha_registro,
    ciudad: profile.ciudad,
    rol: profile.rol,
    foto_perfil_url: profile.foto_perfil_url || null,
  };
}

export async function updateUserProfile({ idUsuario, payload }) {
  const parsedId = Number(idUsuario);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    const error = new Error('El id de usuario no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const currentProfile = await findUserProfileById(parsedId);

  if (!currentProfile) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  const payloadKeys = Object.keys(payload || {}).filter((key) => payload[key] !== undefined);
  const isPhotoOnlyUpdate = payloadKeys.length > 0 && payloadKeys.every((key) => key === 'foto_perfil_url');

  if (isPhotoOnlyUpdate) {
    const fotoPerfilUrlOnly = payload?.foto_perfil_url
      ? String(payload.foto_perfil_url).trim()
      : null;

    await updateUserPhotoById(parsedId, fotoPerfilUrlOnly);
    return getUserProfile(parsedId);
  }

  const nombre = String(payload?.nombre || '').trim();
  const apellido = String(payload?.apellido || '').trim();
  const correo = String(payload?.correo || '').trim().toLowerCase();
  const telefono = String(payload?.telefono || '').trim();
  const ciudad = String(payload?.ciudad || '').trim();
  const fotoPerfilUrl = payload?.foto_perfil_url
    ? String(payload.foto_perfil_url).trim()
    : null;

  if (!nombre || !apellido || !correo || !telefono || !ciudad) {
    const error = new Error('Nombre, apellido, correo, telefono y ciudad son obligatorios.');
    error.statusCode = 400;
    throw error;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    const error = new Error('Correo invalido.');
    error.statusCode = 400;
    throw error;
  }

  if (!/^\d{10}$/.test(telefono)) {
    const error = new Error('Telefono invalido. Debe tener exactamente 10 digitos numericos.');
    error.statusCode = 400;
    throw error;
  }

  await updateUserProfileById(parsedId, {
    nombre,
    apellido,
    correo,
    telefono,
    ciudad,
    foto_perfil_url: fotoPerfilUrl,
  });

  await updateClientCityByUser({
    idUsuario: parsedId,
    oldCorreo: currentProfile.correo,
    newCorreo: correo,
    ciudad,
  });

  return getUserProfile(parsedId);
}

export async function registerUser(payload) {
  const nombreCompleto = String(payload?.nombreCompleto || '').trim();
  const correo = String(payload?.correo || '').trim().toLowerCase();
  const contrasena = String(payload?.contrasena || '').trim();
  const confirmarContrasena = String(payload?.confirmarContrasena || '').trim();

  if (!nombreCompleto || !correo || !contrasena || !confirmarContrasena) {
    const error = new Error('Nombre, correo y contrasena son obligatorios.');
    error.statusCode = 400;
    throw error;
  }

  if (contrasena.length < 6) {
    const error = new Error('La contrasena debe tener al menos 6 caracteres.');
    error.statusCode = 400;
    throw error;
  }

  if (contrasena !== confirmarContrasena) {
    const error = new Error('Las contrasenas no coinciden.');
    error.statusCode = 400;
    throw error;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(correo)) {
    const error = new Error('Correo invalido.');
    error.statusCode = 400;
    throw error;
  }

  const existing = await findUserByEmail(correo);

  if (existing) {
    const error = new Error('Ya existe un usuario con ese correo.');
    error.statusCode = 409;
    throw error;
  }

  const [nombre, ...resto] = nombreCompleto.split(' ');
  const apellido = resto.join(' ').trim() || 'Cliente';

  const createdUser = await createUser({
    nombre,
    apellido,
    correo,
    contrasena,
    telefono: null,
  });

  await createClientFromUser({
    id_usuario: createdUser.id_usuario,
    nombreCompleto,
    telefono: null,
    correo,
    direccion_principal: 'Por definir',
    ciudad: 'Por definir',
    estado: 'Por definir',
    codigo_postal: '00000',
  });

  return createdUser;
}

export async function requestPasswordRecovery(payload) {
  const correo = String(payload?.correo || '').trim().toLowerCase();
  const nueva = String(payload?.nuevaContrasena || '').trim();
  const confirmar = String(payload?.confirmarContrasena || '').trim();

  if (!correo) {
    const error = new Error('El correo es obligatorio.');
    error.statusCode = 400;
    throw error;
  }

  if (!nueva || !confirmar) {
    const error = new Error('Completa la nueva contrasena y la confirmacion.');
    error.statusCode = 400;
    throw error;
  }

  if (nueva.length < 6) {
    const error = new Error('La nueva contrasena debe tener al menos 6 caracteres.');
    error.statusCode = 400;
    throw error;
  }

  if (nueva !== confirmar) {
    const error = new Error('Las contrasenas no coinciden.');
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserByEmail(correo);

  if (!user) {
    const error = new Error('No existe una cuenta con ese correo.');
    error.statusCode = 404;
    throw error;
  }

  if (user.rol === 'conductor') {
    const error = new Error('Las cuentas de conductor no pueden restablecer contrasena desde esta pantalla.');
    error.statusCode = 403;
    throw error;
  }

  if (!['cliente', 'admin'].includes(user.rol)) {
    const error = new Error('Este rol no tiene permitido restablecer contrasena desde este formulario.');
    error.statusCode = 403;
    throw error;
  }

  await updateUserPasswordById(user.id_usuario, nueva);

  return {
    correo,
    id_usuario: user.id_usuario,
    message: user.rol === 'admin'
      ? 'Contrasena de admin actualizada correctamente.'
      : 'Contrasena actualizada correctamente.',
  };
}

export async function changePassword({ idUsuario, payload }) {
  const parsedId = Number(idUsuario);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    const error = new Error('El id de usuario no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const actual = String(payload?.contrasenaActual || '').trim();
  const nueva = String(payload?.nuevaContrasena || '').trim();
  const confirmar = String(payload?.confirmarContrasena || '').trim();

  if (!actual || !nueva || !confirmar) {
    const error = new Error('Completa todos los campos de contrasena.');
    error.statusCode = 400;
    throw error;
  }

  if (nueva.length < 6) {
    const error = new Error('La nueva contrasena debe tener al menos 6 caracteres.');
    error.statusCode = 400;
    throw error;
  }

  if (nueva !== confirmar) {
    const error = new Error('Las contrasenas no coinciden.');
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserProfileById(parsedId);

  if (!user) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  const fullUser = await findUserByEmail(user.correo);

  if (!fullUser || fullUser.contrasena !== actual) {
    const error = new Error('La contrasena actual es incorrecta.');
    error.statusCode = 401;
    throw error;
  }

  await updateUserPasswordById(parsedId, nueva);

  return { id_usuario: parsedId };
}

export async function listManageableUsersForAdmin({ idAdmin, rol }) {
  const parsedAdminId = Number(idAdmin);

  if (!Number.isInteger(parsedAdminId) || parsedAdminId <= 0) {
    const error = new Error('El id del admin no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const admin = await findUserById(parsedAdminId);

  if (!admin) {
    const error = new Error('Admin no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (admin.rol !== 'admin') {
    const error = new Error('Solo un admin puede consultar perfiles de operadores y conductores.');
    error.statusCode = 403;
    throw error;
  }

  const parsedRol = String(rol || '').trim().toLowerCase();
  const roles = parsedRol === 'operador' || parsedRol === 'conductor'
    ? [parsedRol]
    : ['operador', 'conductor'];

  const users = await listManageableUsersByRoles(roles);

  return users.map((user) => ({
    id_usuario: user.id_usuario,
    nombre: user.nombre,
    apellido: user.apellido,
    correo: user.correo,
    contrasena: user.contrasena,
    telefono: user.telefono,
    ciudad: user.ciudad || null,
    rol: user.rol,
    estado: user.estado,
    fecha_registro: user.fecha_registro,
    foto_perfil_url: user.foto_perfil_url || null,
  }));
}

export async function changePasswordByAdmin({ idAdmin, idUsuarioObjetivo, payload }) {
  const parsedAdminId = Number(idAdmin);
  const parsedTargetId = Number(idUsuarioObjetivo);

  if (!Number.isInteger(parsedAdminId) || parsedAdminId <= 0) {
    const error = new Error('El id del admin no es valido.');
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isInteger(parsedTargetId) || parsedTargetId <= 0) {
    const error = new Error('El id del usuario objetivo no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const nueva = String(payload?.nuevaContrasena || '').trim();
  const confirmar = String(payload?.confirmarContrasena || '').trim();

  if (!nueva || !confirmar) {
    const error = new Error('Completa la nueva contrasena y la confirmacion.');
    error.statusCode = 400;
    throw error;
  }

  if (nueva.length < 6) {
    const error = new Error('La nueva contrasena debe tener al menos 6 caracteres.');
    error.statusCode = 400;
    throw error;
  }

  if (nueva !== confirmar) {
    const error = new Error('Las contrasenas no coinciden.');
    error.statusCode = 400;
    throw error;
  }

  const admin = await findUserById(parsedAdminId);

  if (!admin) {
    const error = new Error('Admin no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (admin.rol !== 'admin') {
    const error = new Error('Solo un admin puede cambiar contrasenas de otros usuarios.');
    error.statusCode = 403;
    throw error;
  }

  const target = await findUserById(parsedTargetId);

  if (!target) {
    const error = new Error('Usuario objetivo no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (!['operador', 'conductor'].includes(target.rol)) {
    const error = new Error('El admin solo puede cambiar contrasenas de operadores y conductores.');
    error.statusCode = 403;
    throw error;
  }

  await updateUserPasswordById(parsedTargetId, nueva);

  return {
    id_usuario: parsedTargetId,
    rol: target.rol,
  };
}

export async function createManagedUserByAdmin({ idAdmin, payload }) {
  const parsedAdminId = Number(idAdmin);

  if (!Number.isInteger(parsedAdminId) || parsedAdminId <= 0) {
    const error = new Error('El id del admin no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const admin = await findUserById(parsedAdminId);

  if (!admin) {
    const error = new Error('Admin no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (admin.rol !== 'admin') {
    const error = new Error('Solo un admin puede crear operadores y conductores.');
    error.statusCode = 403;
    throw error;
  }

  const nombre = String(payload?.nombre || '').trim();
  const apellido = String(payload?.apellido || '').trim();
  const correo = String(payload?.correo || '').trim().toLowerCase();
  const telefono = String(payload?.telefono || '').trim();
  const ciudad = String(payload?.ciudad || '').trim();
  const contrasena = String(payload?.contrasena || '').trim();
  const confirmarContrasena = String(payload?.confirmarContrasena || '').trim();
  const rol = String(payload?.rol || '').trim().toLowerCase();
  const licencia = String(payload?.licencia || '').trim();
  const tipoLicencia = String(payload?.tipo_licencia || '').trim().toUpperCase();
  const fechaContratacion = String(payload?.fecha_contratacion || '').trim();

  if (!['operador', 'conductor'].includes(rol)) {
    const error = new Error('El rol debe ser operador o conductor.');
    error.statusCode = 400;
    throw error;
  }

  if (!nombre || !apellido || !correo || !telefono || !ciudad || !contrasena || !confirmarContrasena) {
    const error = new Error('Nombre, apellido, correo, telefono, ciudad y contrasena son obligatorios.');
    error.statusCode = 400;
    throw error;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    const error = new Error('Correo invalido.');
    error.statusCode = 400;
    throw error;
  }

  if (!/^\d{8,15}$/.test(telefono)) {
    const error = new Error('Telefono invalido. Usa solo digitos de 8 a 15 caracteres.');
    error.statusCode = 400;
    throw error;
  }

  if (contrasena.length < 6) {
    const error = new Error('La contrasena debe tener al menos 6 caracteres.');
    error.statusCode = 400;
    throw error;
  }

  if (contrasena !== confirmarContrasena) {
    const error = new Error('Las contrasenas no coinciden.');
    error.statusCode = 400;
    throw error;
  }

  const existing = await findUserByEmail(correo);
  if (existing) {
    const error = new Error('Ya existe un usuario con ese correo.');
    error.statusCode = 409;
    throw error;
  }

  if (rol === 'conductor') {
    if (!licencia || !tipoLicencia || !fechaContratacion) {
      const error = new Error('Para conductor debes capturar licencia, tipo de licencia y fecha de contratacion.');
      error.statusCode = 400;
      throw error;
    }

    if (licencia.length > 8) {
      const error = new Error('La licencia permite maximo 8 caracteres.');
      error.statusCode = 400;
      throw error;
    }

    if (tipoLicencia.length > 8) {
      const error = new Error('El tipo de licencia permite maximo 8 caracteres.');
      error.statusCode = 400;
      throw error;
    }

    const parsedFecha = new Date(fechaContratacion);
    if (Number.isNaN(parsedFecha.getTime())) {
      const error = new Error('La fecha de contratacion no es valida.');
      error.statusCode = 400;
      throw error;
    }
  }

  const created = await createOperationalUser({
    nombre,
    apellido,
    correo,
    contrasena,
    telefono,
    ciudad,
    rol,
  });

  if (!created) {
    const error = new Error('No se pudo crear el usuario.');
    error.statusCode = 500;
    throw error;
  }

  let conductor = null;
  if (rol === 'conductor') {
    conductor = await createConductorFromUser({
      id_usuario: created.id_usuario,
      licencia,
      tipo_licencia: tipoLicencia,
      fecha_contratacion: fechaContratacion,
    });
  }

  return {
    id_usuario: created.id_usuario,
    nombre: created.nombre,
    apellido: created.apellido,
    correo: created.correo,
    telefono: created.telefono,
    ciudad: created.ciudad,
    rol: created.rol,
    estado: created.estado,
    id_conductor: conductor?.id_conductor || null,
  };
}

export async function deleteManagedUserByAdmin({ idAdmin, idUsuarioObjetivo }) {
  const parsedAdminId = Number(idAdmin);
  const parsedTargetId = Number(idUsuarioObjetivo);

  if (!Number.isInteger(parsedAdminId) || parsedAdminId <= 0) {
    const error = new Error('El id del admin no es valido.');
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isInteger(parsedTargetId) || parsedTargetId <= 0) {
    const error = new Error('El id del usuario objetivo no es valido.');
    error.statusCode = 400;
    throw error;
  }

  if (parsedAdminId === parsedTargetId) {
    const error = new Error('No puedes eliminar tu propio usuario.');
    error.statusCode = 400;
    throw error;
  }

  const admin = await findUserById(parsedAdminId);

  if (!admin) {
    const error = new Error('Admin no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (admin.rol !== 'admin') {
    const error = new Error('Solo un admin puede eliminar operadores o conductores.');
    error.statusCode = 403;
    throw error;
  }

  const target = await findUserById(parsedTargetId);

  if (!target) {
    const error = new Error('Usuario objetivo no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (!['operador', 'conductor'].includes(target.rol)) {
    const error = new Error('Solo se pueden eliminar usuarios con rol operador o conductor.');
    error.statusCode = 403;
    throw error;
  }

  if (target.estado === 'inactivo') {
    return {
      id_usuario: target.id_usuario,
      rol: target.rol,
      estado: target.estado,
    };
  }

  const updated = await disableUserById(parsedTargetId);

  if (!updated) {
    const error = new Error('No se pudo eliminar el usuario objetivo.');
    error.statusCode = 500;
    throw error;
  }

  if (updated.rol === 'conductor') {
    await disableConductorByUserId(parsedTargetId);
  }

  return updated;
}

export async function recoverPasswordByEmail({ correo, nuevaContrasena, confirmarContrasena }) {
  const correoLimpio = String(correo || '').trim().toLowerCase();
  const nueva = String(nuevaContrasena || '').trim();
  const confirmar = String(confirmarContrasena || '').trim();

  if (!correoLimpio || !nueva || !confirmar) {
    const error = new Error('Completa todos los campos.');
    error.statusCode = 400;
    throw error;
  }

  if (nueva.length < 6) {
    const error = new Error('La nueva contraseña debe tener al menos 6 caracteres.');
    error.statusCode = 400;
    throw error;
  }

  if (nueva !== confirmar) {
    const error = new Error('Las contraseñas no coinciden.');
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserByEmail(correoLimpio);

  if (!user) {
    const error = new Error('El correo no está registrado.');
    error.statusCode = 404;
    throw error;
  }

  if (user.rol !== 'cliente') {
    const error = new Error('Solo las cuentas de usuarios pueden cambiar su contraseña.');
    error.statusCode = 403;
    throw error;
  }

  await updateUserPasswordById(user.id_usuario, nueva);

  return {
    id_usuario: user.id_usuario,
    correo: user.correo,
  };
}
