import { pool } from '../db/pool.js';

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
  const result = await pool.query(
    `SELECT
        id_notificacion,
        titulo,
        mensaje,
        leida,
        fecha
     FROM notificaciones
     WHERE id_usuario = $1
     ORDER BY fecha DESC`,
    [userId]
  );

  return result.rows;
}

export async function listNotificationsForOperator() {
  const result = await pool.query(
    `SELECT
        n.id_notificacion,
        n.titulo,
        n.mensaje,
        n.leida,
        n.fecha,
        u.id_usuario
     FROM notificaciones n
     JOIN usuarios u ON u.id_usuario = n.id_usuario
     ORDER BY n.fecha DESC
     LIMIT 100`
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

export async function createNotificationsForUsers(userIds, { titulo, mensaje }) {
  if (!Array.isArray(userIds) || userIds.length === 0) {
    return 0;
  }

  const title = String(titulo || '').trim();
  const message = String(mensaje || '').trim();

  if (!title || !message) {
    return 0;
  }

  const result = await pool.query(
    `INSERT INTO notificaciones (id_usuario, titulo, mensaje, leida, fecha)
     SELECT DISTINCT u.id_usuario, $2, $3, FALSE, NOW()
     FROM unnest($1::int[]) AS u(id_usuario)
     RETURNING id_notificacion`,
    [userIds, title, message]
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
