import {
  createClientFromUser,
  createUser,
  findUserByEmail,
  findUserProfileById,
  updateUserPasswordById,
  updateClientCityByUser,
  updateUserProfileById,
} from '../repositories/authRepository.js';

const ACCESS_ROLE_MAP = {
  usuario: 'cliente',
  chofer: 'conductor',
  repartidor: 'conductor',
};

export async function loginUser({ correo, contrasena, tipoAcceso }) {
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

  const nombre = String(payload?.nombre || '').trim();
  const apellido = String(payload?.apellido || '').trim();
  const correo = String(payload?.correo || '').trim().toLowerCase();
  const telefono = String(payload?.telefono || '').trim();
  const ciudad = String(payload?.ciudad || '').trim();

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

  if (!/^\d{8,15}$/.test(telefono)) {
    const error = new Error('Telefono invalido. Usa solo digitos de 8 a 15 caracteres.');
    error.statusCode = 400;
    throw error;
  }

  await updateUserProfileById(parsedId, {
    nombre,
    apellido,
    correo,
    telefono,
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

  if (!correo) {
    const error = new Error('El correo es obligatorio.');
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserByEmail(correo);

  if (!user) {
    const error = new Error('No existe una cuenta con ese correo.');
    error.statusCode = 404;
    throw error;
  }

  return {
    correo,
    message: 'Solicitud de recuperacion registrada. Contacta al administrador para restablecerla.',
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
