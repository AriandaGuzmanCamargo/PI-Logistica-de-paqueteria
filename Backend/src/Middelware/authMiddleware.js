import jwt from 'jsonwebtoken';

function getBearerToken(req) {
  const header = req.headers?.authorization || req.headers?.Authorization;

  if (!header || typeof header !== 'string') {
    return null;
  }

  if (!header.toLowerCase().startsWith('bearer ')) {
    return null;
  }

  return header.slice(7).trim();
}

export function requireAuth(req, _res, next) {
  try {
    const token = getBearerToken(req);

    if (!token) {
      const error = new Error('Acceso denegado. Token requerido.');
      error.statusCode = 401;
      throw error;
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      const error = new Error('JWT_SECRET no esta configurado en el entorno.');
      error.statusCode = 500;
      throw error;
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 401;
      error.message = 'Token no valido o expirado.';
    }
    next(error);
  }
}

export function requireAdmin(req, _res, next) {
  const rol = String(req.user?.rol || '').trim().toLowerCase();

  if (rol === 'admin' || rol === 'administrador') {
    return next();
  }

  const error = new Error('Solo administradores pueden acceder a este recurso.');
  error.statusCode = 403;
  return next(error);
}
