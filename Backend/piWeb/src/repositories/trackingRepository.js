import { pool } from '../db/pool.js';

export async function findShipmentByTrackingCode(codigoRastreo) {
  const result = await pool.query(
    `SELECT
        p.id_paquete,
        p.codigo_rastreo,
        p.descripcion AS paquete_descripcion,
        p.tipo_contenido,
        p.peso,
        p.estado_actual AS estado_paquete,
        e.id_envio,
        e.estado_envio,
        e.direccion_origen,
        e.direccion_destino,
        e.ciudad_origen,
        e.ciudad_destino,
        e.fecha_creacion,
        e.fecha_estimada_entrega,
        e.fecha_entrega_real,
        e.costo_total
     FROM paquetes p
     JOIN envio_paquete ep ON ep.id_paquete = p.id_paquete
     JOIN envios e ON e.id_envio = ep.id_envio
     WHERE p.codigo_rastreo = $1
     ORDER BY e.fecha_creacion DESC
     LIMIT 1`,
    [codigoRastreo]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function listTrackingEventsByShipment(shipmentId, packageId) {
  const result = await pool.query(
    `SELECT
        id_tracking,
        ubicacion_actual,
        estado_paquete,
        observaciones,
        fecha_hora
     FROM tracking
     WHERE id_envio = $1 OR id_paquete = $2
     ORDER BY fecha_hora DESC`,
    [shipmentId, packageId]
  );

  return result.rows;
}
