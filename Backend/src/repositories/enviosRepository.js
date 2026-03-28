import { pool } from '../db/pool.js';

export async function findUserById(userId) {
  const result = await pool.query(
    `SELECT id_usuario, nombre, apellido, rol
     FROM usuarios
     WHERE id_usuario = $1
     LIMIT 1`,
    [userId]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

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
        c_rem.nombre AS remitente_nombre,
        c_des.nombre AS destinatario_nombre,
        p.id_paquete,
        p.codigo_rastreo,
        p.estado_actual AS estado_paquete
     FROM envios e
     JOIN clientes c_rem ON c_rem.id_cliente = e.id_cliente_remitente
     JOIN clientes c_des ON c_des.id_cliente = e.id_cliente_destinatario
     LEFT JOIN envio_paquete ep ON ep.id_envio = e.id_envio
     LEFT JOIN paquetes p ON p.id_paquete = ep.id_paquete
     WHERE e.id_cliente_remitente = $1 OR e.id_cliente_destinatario = $1
     ORDER BY e.fecha_creacion DESC`,
    [clientId]
  );

  return result.rows;
}

export async function listShipmentsForOperator() {
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
        c_rem.nombre AS remitente_nombre,
        c_des.nombre AS destinatario_nombre,
        p.id_paquete,
        p.codigo_rastreo,
        p.estado_actual AS estado_paquete
     FROM envios e
     JOIN clientes c_rem ON c_rem.id_cliente = e.id_cliente_remitente
     JOIN clientes c_des ON c_des.id_cliente = e.id_cliente_destinatario
     LEFT JOIN envio_paquete ep ON ep.id_envio = e.id_envio
     LEFT JOIN paquetes p ON p.id_paquete = ep.id_paquete
     ORDER BY e.fecha_creacion DESC`
  );

  return result.rows;
}

export async function findShipmentById(idEnvio) {
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
        c_rem.id_cliente AS remitente_id,
        c_rem.nombre AS remitente_nombre,
        c_rem.telefono AS remitente_telefono,
        c_rem.correo AS remitente_correo,
        c_des.id_cliente AS destinatario_id,
        c_des.nombre AS destinatario_nombre,
        c_des.telefono AS destinatario_telefono,
        c_des.correo AS destinatario_correo,
        p.id_paquete,
        p.codigo_rastreo,
        p.descripcion AS paquete_descripcion,
        p.tipo_contenido,
        p.peso,
        p.volumen,
        p.largo,
        p.ancho,
        p.alto,
        p.valor_declarado,
        p.tipo_servicio,
        p.estado_actual AS estado_paquete
     FROM envios e
     JOIN clientes c_rem ON c_rem.id_cliente = e.id_cliente_remitente
     JOIN clientes c_des ON c_des.id_cliente = e.id_cliente_destinatario
     LEFT JOIN envio_paquete ep ON ep.id_envio = e.id_envio
     LEFT JOIN paquetes p ON p.id_paquete = ep.id_paquete
     WHERE e.id_envio = $1
     LIMIT 1`,
    [idEnvio]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}
