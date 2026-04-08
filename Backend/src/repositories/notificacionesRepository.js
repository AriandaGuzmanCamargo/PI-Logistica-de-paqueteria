import { pool } from '../config/db.js';

async function ensureDeliveryNotificationColumns() {
  await pool.query(
    `ALTER TABLE notificaciones
     ADD COLUMN IF NOT EXISTS id_envio INT`
  );

  await pool.query(
    `ALTER TABLE notificaciones
     ADD COLUMN IF NOT EXISTS foto_entrega_url TEXT`
  );

  await pool.query(
    `ALTER TABLE notificaciones
     ADD COLUMN IF NOT EXISTS fecha_evento TIMESTAMP`
  );

  await pool.query(
    `ALTER TABLE notificaciones
     ADD COLUMN IF NOT EXISTS recibio_entrega_nombre VARCHAR(120)`
  );
}

export async function findUserById(userId) {
  const result = await pool.query(
    `SELECT id_usuario, rol
     FROM usuarios
     WHERE id_usuario = $1
     LIMIT 1`,
    [userId]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function listNotificationsByUser(userId) {
  await ensureDeliveryNotificationColumns();

  const result = await pool.query(
    `SELECT
        id_notificacion,
        titulo,
        mensaje,
        leida,
        fecha,
        id_envio,
        foto_entrega_url,
        fecha_evento,
        recibio_entrega_nombre
     FROM notificaciones
     WHERE id_usuario = $1
     ORDER BY fecha DESC`,
    [userId]
  );

  return result.rows;
}

export async function listNotificationsForOperator() {
  await ensureDeliveryNotificationColumns();

  const result = await pool.query(
    `SELECT
        n.id_notificacion,
        n.titulo,
        n.mensaje,
        n.leida,
        n.fecha,
        n.id_envio,
        n.foto_entrega_url,
        n.fecha_evento,
        n.recibio_entrega_nombre,
        u.id_usuario
     FROM notificaciones n
     JOIN usuarios u ON u.id_usuario = n.id_usuario
     ORDER BY n.fecha DESC
     LIMIT 100`
  );

  return result.rows;
}

export async function listNotificationsByRoles(roles) {
  if (!Array.isArray(roles) || roles.length === 0) {
    return [];
  }

  await ensureDeliveryNotificationColumns();

  const result = await pool.query(
    `SELECT
        n.id_notificacion,
        n.titulo,
        n.mensaje,
        n.leida,
        n.fecha,
        n.id_envio,
        n.foto_entrega_url,
        n.fecha_evento,
        n.recibio_entrega_nombre,
        n.id_usuario
     FROM notificaciones n
     JOIN usuarios u ON u.id_usuario = n.id_usuario
     WHERE u.rol::text = ANY($1::text[])
     ORDER BY n.fecha DESC
     LIMIT 200`,
    [roles]
  );

  return result.rows;
}

export async function findUserIdsByRoles(roles) {
  if (!Array.isArray(roles) || roles.length === 0) {
    return [];
  }

  const result = await pool.query(
    `SELECT id_usuario
     FROM usuarios
     WHERE rol::text = ANY($1::text[])`,
    [roles]
  );

  return result.rows.map((row) => row.id_usuario);
}

export async function createNotificationsForUsers(
  userIds,
  { titulo, mensaje, idEnvio, fotoEntregaUrl, fechaEvento, recibioEntregaNombre } = {}
) {
  await ensureDeliveryNotificationColumns();

  if (!Array.isArray(userIds) || userIds.length === 0) {
    return 0;
  }

  const title = String(titulo || '').trim();
  const message = String(mensaje || '').trim();
  const shipmentId = Number.isInteger(Number(idEnvio)) ? Number(idEnvio) : null;
  const deliveryPhoto =
    typeof fotoEntregaUrl === 'string' && fotoEntregaUrl.trim().length > 0
      ? fotoEntregaUrl.trim()
      : null;
  const eventDate = fechaEvento || null;
  const receiverName =
    typeof recibioEntregaNombre === 'string' && recibioEntregaNombre.trim().length > 0
      ? recibioEntregaNombre.trim().slice(0, 120)
      : null;

  if (!title || !message) {
    return 0;
  }

  const result = await pool.query(
    `INSERT INTO notificaciones (
      id_usuario,
      titulo,
      mensaje,
      leida,
      fecha,
      id_envio,
      foto_entrega_url,
      fecha_evento,
      recibio_entrega_nombre
     )
     SELECT DISTINCT u.id_usuario, $2, $3, FALSE, NOW(), $4, $5, $6, $7
     FROM unnest($1::int[]) AS u(id_usuario)
     RETURNING id_notificacion`,
    [userIds, title, message, shipmentId, deliveryPhoto, eventDate, receiverName]
  );

  return result.rowCount || 0;
}

export async function markNotificationAsReadByUser(idNotificacion, idUsuario) {
  const result = await pool.query(
    `UPDATE notificaciones
     SET leida = TRUE
     WHERE id_notificacion = $1
       AND id_usuario = $2
     RETURNING id_notificacion, id_usuario, leida`,
    [idNotificacion, idUsuario]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function markAllNotificationsAsReadByUser(idUsuario) {
  const result = await pool.query(
    `UPDATE notificaciones
     SET leida = TRUE
     WHERE id_usuario = $1
       AND leida = FALSE`,
    [idUsuario]
  );

  return result.rowCount || 0;
}
