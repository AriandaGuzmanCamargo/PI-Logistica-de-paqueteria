import {
  findClientIdByUserId,
  listShipmentsByClientId,
} from '../repositories/enviosRepository.js';

export async function getShipmentsByUser(userId) {
  const parsedId = Number(userId);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    const error = new Error('El id de usuario no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const clientId = await findClientIdByUserId(parsedId);

  if (!clientId) {
    return [];
  }

  const shipments = await listShipmentsByClientId(clientId);

  return shipments.map((item) => ({
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
    paquete: item.id_paquete
      ? {
          id_paquete: item.id_paquete,
          codigo_rastreo: item.codigo_rastreo,
          estado_actual: item.estado_paquete,
        }
      : null,
  }));
}
