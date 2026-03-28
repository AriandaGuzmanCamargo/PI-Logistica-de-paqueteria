import {
  createDireccionByUsuario,
  deleteDireccionById,
  findDireccionById,
  findUserById,
  listDireccionesByUsuario,
  updateDireccionById,
} from '../repositories/direccionesRepository.js';

function parseUserId(idUsuario) {
  const parsed = Number(idUsuario);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    const error = new Error('El id de usuario no es valido.');
    error.statusCode = 400;
    throw error;
  }

  return parsed;
}

async function ensureUserExists(idUsuario) {
  const user = await findUserById(idUsuario);

  if (!user) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }
}

function sanitizeDireccionPayload(payload) {
  const cleaned = {
    alias: String(payload?.alias || '').trim(),
    direccion: String(payload?.direccion || '').trim(),
    ciudad: String(payload?.ciudad || '').trim(),
    estado: String(payload?.estado || '').trim(),
    codigo_postal: String(payload?.codigo_postal || '').trim(),
    referencias: String(payload?.referencias || '').trim(),
    es_predeterminada: Boolean(payload?.es_predeterminada),
  };

  if (!cleaned.alias || !cleaned.direccion || !cleaned.ciudad) {
    const error = new Error('Alias, direccion y ciudad son obligatorios.');
    error.statusCode = 400;
    throw error;
  }

  if (cleaned.codigo_postal && !/^\d{4,10}$/.test(cleaned.codigo_postal)) {
    const error = new Error('Codigo postal invalido. Usa solo digitos.');
    error.statusCode = 400;
    throw error;
  }

  return cleaned;
}

function mapDireccion(item) {
  return {
    id_direccion: item.id_direccion,
    alias: item.alias,
    direccion: item.direccion,
    ciudad: item.ciudad,
    estado: item.estado,
    codigo_postal: item.codigo_postal,
    referencias: item.referencias,
    es_predeterminada: item.es_predeterminada,
    fecha_registro: item.fecha_registro,
  };
}

export async function getDireccionesByUsuario(idUsuario) {
  const userId = parseUserId(idUsuario);
  await ensureUserExists(userId);

  const rows = await listDireccionesByUsuario(userId);
  return rows.map(mapDireccion);
}

export async function createDireccion({ idUsuario, payload }) {
  const userId = parseUserId(idUsuario);
  await ensureUserExists(userId);

  const cleaned = sanitizeDireccionPayload(payload);
  const created = await createDireccionByUsuario(userId, cleaned);

  return mapDireccion(created);
}

export async function updateDireccion({ idUsuario, idDireccion, payload }) {
  const userId = parseUserId(idUsuario);
  const direccionId = Number(idDireccion);

  if (!Number.isInteger(direccionId) || direccionId <= 0) {
    const error = new Error('El id de direccion no es valido.');
    error.statusCode = 400;
    throw error;
  }

  await ensureUserExists(userId);

  const current = await findDireccionById(direccionId);

  if (!current) {
    const error = new Error('Direccion no encontrada.');
    error.statusCode = 404;
    throw error;
  }

  if (current.id_usuario !== userId) {
    const error = new Error('No puedes editar una direccion que no te pertenece.');
    error.statusCode = 403;
    throw error;
  }

  const cleaned = sanitizeDireccionPayload(payload);
  const updated = await updateDireccionById(direccionId, cleaned);

  return mapDireccion(updated);
}

export async function deleteDireccion({ idUsuario, idDireccion }) {
  const userId = parseUserId(idUsuario);
  const direccionId = Number(idDireccion);

  if (!Number.isInteger(direccionId) || direccionId <= 0) {
    const error = new Error('El id de direccion no es valido.');
    error.statusCode = 400;
    throw error;
  }

  await ensureUserExists(userId);

  const current = await findDireccionById(direccionId);

  if (!current) {
    const error = new Error('Direccion no encontrada.');
    error.statusCode = 404;
    throw error;
  }

  if (current.id_usuario !== userId) {
    const error = new Error('No puedes eliminar una direccion que no te pertenece.');
    error.statusCode = 403;
    throw error;
  }

  await deleteDireccionById(direccionId);

  return { id_direccion: direccionId };
}
