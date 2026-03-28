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
