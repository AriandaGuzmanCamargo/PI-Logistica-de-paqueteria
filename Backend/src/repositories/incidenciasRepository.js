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

export async function listIncidenciasForOperator() {
  const result = await pool.query(
    `SELECT
        i.id_incidencia,
        i.tipo_incidencia,
        i.descripcion,
        i.fecha_reporte,
        i.estado,
        u.id_usuario AS reportado_por_id,
        CONCAT(u.nombre, ' ', u.apellido) AS reportado_por_nombre,
        e.id_envio,
        p.codigo_rastreo,
        e.estado_envio
     FROM incidencias i
     JOIN usuarios u ON u.id_usuario = i.id_usuario
     JOIN envios e ON e.id_envio = i.id_envio
     LEFT JOIN paquetes p ON p.id_paquete = i.id_paquete
     ORDER BY i.fecha_reporte DESC`
  );

  return result.rows;
}

export async function listIncidenciasByReporter(userId) {
  const result = await pool.query(
    `SELECT
        i.id_incidencia,
        i.tipo_incidencia,
        i.descripcion,
        i.fecha_reporte,
        i.estado,
        u.id_usuario AS reportado_por_id,
        CONCAT(u.nombre, ' ', u.apellido) AS reportado_por_nombre,
        e.id_envio,
        p.codigo_rastreo,
        e.estado_envio
     FROM incidencias i
     JOIN usuarios u ON u.id_usuario = i.id_usuario
     JOIN envios e ON e.id_envio = i.id_envio
     LEFT JOIN paquetes p ON p.id_paquete = i.id_paquete
     WHERE i.id_usuario = $1
     ORDER BY i.fecha_reporte DESC`,
    [userId]
  );

  return result.rows;
}
