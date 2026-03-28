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
  const hasIdUsuarioColumnResult = await pool.query(
    `SELECT 1
     FROM information_schema.columns
     WHERE table_schema = 'public'
       AND table_name = 'clientes'
       AND column_name = 'id_usuario'
     LIMIT 1`
  );

  let result;

  if (hasIdUsuarioColumnResult.rowCount > 0) {
    result = await pool.query(
      `SELECT id_cliente
       FROM clientes
       WHERE id_usuario = $1
       LIMIT 1`,
      [userId]
    );
  } else {
    result = await pool.query(
      `SELECT c.id_cliente
       FROM usuarios u
       JOIN clientes c ON LOWER(c.correo) = LOWER(u.correo)
       WHERE u.id_usuario = $1
       LIMIT 1`,
      [userId]
    );
  }

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

export async function updateShipmentBasicDataById(idEnvio, changes) {
  const fields = [];
  const values = [];

  if (changes.direccion_origen !== undefined) {
    values.push(changes.direccion_origen);
    fields.push(`direccion_origen = $${values.length}`);
  }

  if (changes.direccion_destino !== undefined) {
    values.push(changes.direccion_destino);
    fields.push(`direccion_destino = $${values.length}`);
  }

  if (changes.ciudad_origen !== undefined) {
    values.push(changes.ciudad_origen);
    fields.push(`ciudad_origen = $${values.length}`);
  }

  if (changes.ciudad_destino !== undefined) {
    values.push(changes.ciudad_destino);
    fields.push(`ciudad_destino = $${values.length}`);
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(idEnvio);

  const result = await pool.query(
    `UPDATE envios
     SET ${fields.join(', ')}
     WHERE id_envio = $${values.length}
     RETURNING id_envio`,
    values
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function cancelShipmentById(idEnvio) {
  const result = await pool.query(
    `UPDATE envios
     SET estado_envio = 'cancelado'
     WHERE id_envio = $1
     RETURNING id_envio`,
    [idEnvio]
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function updateClientProfileById(clientId, payload) {
  const fields = [];
  const values = [];

  if (payload.nombre !== undefined) {
    values.push(payload.nombre);
    fields.push(`nombre = $${values.length}`);
  }

  if (payload.telefono !== undefined) {
    values.push(payload.telefono);
    fields.push(`telefono = $${values.length}`);
  }

  if (payload.correo !== undefined) {
    values.push(payload.correo);
    fields.push(`correo = $${values.length}`);
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(clientId);

  const result = await pool.query(
    `UPDATE clientes
     SET ${fields.join(', ')}
     WHERE id_cliente = $${values.length}
     RETURNING id_cliente`,
    values
  );

  return result.rowCount > 0 ? result.rows[0] : null;
}

export async function createShipmentWithPackageByClient(payload) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    let recipientId = null;

    if (payload.destinatario.correo) {
      const recipientByEmail = await client.query(
        `SELECT id_cliente
         FROM clientes
         WHERE LOWER(correo) = LOWER($1)
         LIMIT 1`,
        [payload.destinatario.correo]
      );

      if (recipientByEmail.rowCount > 0) {
        recipientId = recipientByEmail.rows[0].id_cliente;
      }
    }

    if (!recipientId) {
      const recipientInsert = await client.query(
        `INSERT INTO clientes (
          nombre,
          telefono,
          correo,
          direccion_principal,
          ciudad,
          estado,
          codigo_postal
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id_cliente`,
        [
          payload.destinatario.nombre,
          payload.destinatario.telefono || null,
          payload.destinatario.correo || null,
          payload.destinatario.direccion,
          payload.destinatario.ciudad,
          payload.destinatario.estado,
          payload.destinatario.codigo_postal,
        ]
      );

      recipientId = recipientInsert.rows[0].id_cliente;
    }

    const shipmentInsert = await client.query(
      `INSERT INTO envios (
        id_cliente_remitente,
        id_cliente_destinatario,
        direccion_origen,
        direccion_destino,
        ciudad_origen,
        ciudad_destino,
        fecha_estimada_entrega,
        costo_total,
        estado_envio
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pendiente')
      RETURNING id_envio`,
      [
        payload.id_cliente_remitente,
        recipientId,
        payload.remitente.direccion,
        payload.destinatario.direccion,
        payload.remitente.ciudad,
        payload.destinatario.ciudad,
        payload.fecha_estimada_entrega,
        payload.costo_total,
      ]
    );

    const idEnvio = shipmentInsert.rows[0].id_envio;

    const packageInsert = await client.query(
      `INSERT INTO paquetes (
        codigo_rastreo,
        descripcion,
        tipo_contenido,
        peso,
        volumen,
        largo,
        ancho,
        alto,
        valor_declarado,
        tipo_servicio,
        estado_actual
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'registrado')
      RETURNING id_paquete`,
      [
        payload.paquete.codigo_rastreo,
        payload.paquete.descripcion || null,
        payload.paquete.tipo_contenido || null,
        payload.paquete.peso,
        payload.paquete.volumen,
        payload.paquete.largo,
        payload.paquete.ancho,
        payload.paquete.alto,
        payload.paquete.valor_declarado,
        payload.paquete.tipo_servicio,
      ]
    );

    const idPaquete = packageInsert.rows[0].id_paquete;

    await client.query(
      `INSERT INTO envio_paquete (id_envio, id_paquete)
       VALUES ($1, $2)`,
      [idEnvio, idPaquete]
    );

    await client.query(
      `INSERT INTO tracking (
        id_paquete,
        id_envio,
        ubicacion_actual,
        estado_paquete,
        observaciones
      ) VALUES ($1, $2, $3, 'registrado', $4)`,
      [idPaquete, idEnvio, payload.remitente.ciudad, 'Envio creado por cliente']
    );

    await client.query('COMMIT');

    return {
      id_envio: idEnvio,
      id_paquete: idPaquete,
      codigo_rastreo: payload.paquete.codigo_rastreo,
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
