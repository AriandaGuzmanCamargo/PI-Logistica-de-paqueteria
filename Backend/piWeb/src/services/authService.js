import { findUserByEmail } from '../repositories/authRepository.js';

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
