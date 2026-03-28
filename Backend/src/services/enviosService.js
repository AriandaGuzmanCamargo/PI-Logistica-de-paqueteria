import {
  findShipmentById,
  findUserById,
  findClientIdByUserId,
  listShipmentsForOperator,
  listShipmentsByClientId,
} from '../repositories/enviosRepository.js';

function mapShipment(item) {
  return {
    id_envio: item.id_envio,
    estado_envio: item.estado_envio,
    direccion_origen: item.direccion_origen,
    direccion_destino: item.direccion_destino,
    ciudad_origen: item.ciudad_origen,
    ciudad_destino: item.ciudad_destino,
    fecha_creacion: item.fecha_creacion,
    fecha_estimada_entrega: item.fecha_estimada_entrega,
    fecha_entrega_real: item.fecha_entrega_real,
    costo_total: item.costo_total,
    remitente: item.remitente_nombre
      ? {
          nombre: item.remitente_nombre,
        }
      : null,
    destinatario: item.destinatario_nombre
      ? {
          nombre: item.destinatario_nombre,
        }
      : null,
    paquete: item.id_paquete
      ? {
          id_paquete: item.id_paquete,
          codigo_rastreo: item.codigo_rastreo,
          estado_actual: item.estado_paquete,
        }
      : null,
  };
}

export async function getShipmentsByUser(userId) {
  const parsedId = Number(userId);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    const error = new Error('El id de usuario no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserById(parsedId);

  if (!user) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (user.rol === 'operador' || user.rol === 'admin') {
    const shipments = await listShipmentsForOperator();
    return shipments.map(mapShipment);
  }

  const clientId = await findClientIdByUserId(parsedId);

  if (!clientId) {
    return [];
  }

  const shipments = await listShipmentsByClientId(clientId);

  return shipments.map(mapShipment);
}

export async function getShipmentDetailById(idEnvio) {
  const parsedId = Number(idEnvio);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    const error = new Error('El id de envio no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const item = await findShipmentById(parsedId);

  if (!item) {
    const error = new Error('Envio no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  return {
    id_envio: item.id_envio,
    estado_envio: item.estado_envio,
    direccion_origen: item.direccion_origen,
    direccion_destino: item.direccion_destino,
    ciudad_origen: item.ciudad_origen,
    ciudad_destino: item.ciudad_destino,
    fecha_creacion: item.fecha_creacion,
    fecha_estimada_entrega: item.fecha_estimada_entrega,
    fecha_entrega_real: item.fecha_entrega_real,
    costo_total: item.costo_total,
    remitente: {
      id_cliente: item.remitente_id,
      nombre: item.remitente_nombre,
      telefono: item.remitente_telefono,
      correo: item.remitente_correo,
    },
    destinatario: {
      id_cliente: item.destinatario_id,
      nombre: item.destinatario_nombre,
      telefono: item.destinatario_telefono,
      correo: item.destinatario_correo,
    },
    paquete: item.id_paquete
      ? {
          id_paquete: item.id_paquete,
          codigo_rastreo: item.codigo_rastreo,
          descripcion: item.paquete_descripcion,
          tipo_contenido: item.tipo_contenido,
          peso: item.peso,
          volumen: item.volumen,
          largo: item.largo,
          ancho: item.ancho,
          alto: item.alto,
          valor_declarado: item.valor_declarado,
          tipo_servicio: item.tipo_servicio,
          estado_actual: item.estado_paquete,
        }
      : null,
  };
}
