import {
  findShipmentByTrackingCode,
  listTrackingEventsByShipment,
} from '../repositories/trackingRepository.js';

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizePhone(value) {
  return String(value || '').replace(/\D+/g, '');
}

function mapTrackingResponse(shipment, timeline) {
  return {
    envio: {
      id_envio: shipment.id_envio,
      estado_envio: shipment.estado_envio,
      direccion_origen: shipment.direccion_origen,
      direccion_destino: shipment.direccion_destino,
      ciudad_origen: shipment.ciudad_origen,
      ciudad_destino: shipment.ciudad_destino,
      fecha_creacion: shipment.fecha_creacion,
      fecha_estimada_entrega: shipment.fecha_estimada_entrega,
      fecha_entrega_real: shipment.fecha_entrega_real,
      costo_total: shipment.costo_total,
    },
    paquete: {
      id_paquete: shipment.id_paquete,
      codigo_rastreo: shipment.codigo_rastreo,
      descripcion: shipment.paquete_descripcion,
      tipo_contenido: shipment.tipo_contenido,
      peso: shipment.peso,
      estado_actual: shipment.estado_paquete,
    },
    tracking: timeline,
  };
}

export async function getTrackingByCode(codigoRastreo) {
  const codigo = String(codigoRastreo || '').trim();

  if (!codigo) {
    const error = new Error('El codigo de rastreo es obligatorio.');
    error.statusCode = 400;
    throw error;
  }

  const shipment = await findShipmentByTrackingCode(codigo);

  if (!shipment) {
    const error = new Error('No se encontro un envio para ese codigo de rastreo.');
    error.statusCode = 404;
    throw error;
  }

  const timeline = await listTrackingEventsByShipment(shipment.id_envio, shipment.id_paquete);

  return mapTrackingResponse(shipment, timeline);
}

export async function getPublicTrackingByCode({ codigoRastreo, correo, telefono }) {
  const codigo = String(codigoRastreo || '').trim();
  const normalizedEmail = normalizeEmail(correo);
  const normalizedPhone = normalizePhone(telefono);

  if (!codigo) {
    const error = new Error('El codigo de rastreo es obligatorio.');
    error.statusCode = 400;
    throw error;
  }

  if (!normalizedEmail && !normalizedPhone) {
    const error = new Error('Debes enviar correo o telefono para validar la consulta publica.');
    error.statusCode = 400;
    throw error;
  }

  const shipment = await findShipmentByTrackingCode(codigo);

  if (!shipment) {
    const error = new Error('No se encontro un envio para ese codigo de rastreo.');
    error.statusCode = 404;
    throw error;
  }

  const senderEmail = normalizeEmail(shipment.remitente_correo);
  const recipientEmail = normalizeEmail(shipment.destinatario_correo);
  const senderPhone = normalizePhone(shipment.remitente_telefono);
  const recipientPhone = normalizePhone(shipment.destinatario_telefono);

  const emailMatches =
    Boolean(normalizedEmail) &&
    (normalizedEmail === senderEmail || normalizedEmail === recipientEmail);
  const phoneMatches =
    Boolean(normalizedPhone) &&
    (normalizedPhone === senderPhone || normalizedPhone === recipientPhone);

  if (!emailMatches && !phoneMatches) {
    const error = new Error('No se pudo validar la consulta publica con los datos proporcionados.');
    error.statusCode = 403;
    throw error;
  }

  const timeline = await listTrackingEventsByShipment(shipment.id_envio, shipment.id_paquete);

  return mapTrackingResponse(shipment, timeline);
}
