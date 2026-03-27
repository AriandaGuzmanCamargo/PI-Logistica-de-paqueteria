import { pool } from '../db/pool.js';

export async function findClientIdByUserId(userId) {
  const result = await pool.query(
    `SELECT c.id_cliente
     FROM usuarios u
     JOIN clientes c ON LOWER(c.correo) = LOWER(u.correo)
     WHERE u.id_usuario = $1
     LIMIT 1`,
    [userId]
  );

  return result.rowCount > 0 ? result.rows[0].id_cliente : null;
}

export async function listShipmentsByClientId(clientId) {
  const result = await pool.query(
    `SELECT
        e.id_envio,
        e.estado_envio,
        e.direccion_origen,
        e.direccion_destino,
        e.ciudad_origen,
        e.ciudad_destino,
        e.fecha_creacion,
        e.fecha_estimada_entrega,
        e.fecha_entrega_real,
        e.costo_total,
        p.id_paquete,
        p.codigo_rastreo,
        p.estado_actual AS estado_paquete
     FROM envios e
     LEFT JOIN envio_paquete ep ON ep.id_envio = e.id_envio
     LEFT JOIN paquetes p ON p.id_paquete = ep.id_paquete
     WHERE e.id_cliente_remitente = $1 OR e.id_cliente_destinatario = $1
     ORDER BY e.fecha_creacion DESC`,
    [clientId]
  );

  return result.rows;
}
