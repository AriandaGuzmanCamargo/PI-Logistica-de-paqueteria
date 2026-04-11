import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;
const BCRYPT_HASH_REGEX = /^\$2[aby]\$\d{2}\$/;

export function isBcryptHash(value) {
  return typeof value === 'string' && BCRYPT_HASH_REGEX.test(value);
}

export async function hashPassword(plainTextPassword) {
  return bcrypt.hash(String(plainTextPassword || ''), SALT_ROUNDS);
}

export async function verifyPassword(plainTextPassword, storedPassword) {
  const rawPassword = String(plainTextPassword || '');
  const persistedPassword = String(storedPassword || '');

  if (!persistedPassword) {
    return false;
  }

  if (isBcryptHash(persistedPassword)) {
    return bcrypt.compare(rawPassword, persistedPassword);
  }

  // Backward compatibility: allow legacy plain-text passwords and upgrade them on login.
  return persistedPassword === rawPassword;
}

export function signAuthToken(usuario) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    const error = new Error('JWT_SECRET no esta configurado en el entorno.');
    error.statusCode = 500;
    throw error;
  }

  return jwt.sign(
    {
      id_usuario: usuario.id_usuario,
      correo: usuario.correo,
      rol: usuario.rol,
    },
    secret,
    { expiresIn: '30s' }
  );
}
