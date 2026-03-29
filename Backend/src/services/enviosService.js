import {
  cancelShipmentById,
  createShipmentWithPackageByClient,
  findShipmentById,
  findUserById,
  findClientIdByUserId,
  listShipmentsAssignedToDriverByUserId,
  markShipmentAsDeliveredByDriver,
  listShipmentsForOperator,
  listShipmentsByClientId,
  updateClientProfileById,
  updateShipmentBasicDataById,
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
    asignado_al_conductor: Boolean(item.asignado_al_conductor),
    id_asignacion_activa: item.id_asignacion_activa || null,
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

  if (user.rol === 'conductor') {
    const assignedShipments = await listShipmentsAssignedToDriverByUserId(parsedId);

    return assignedShipments.map((item) =>
      mapShipment({
        ...item,
        asignado_al_conductor: true,
        id_asignacion_activa: item.id_asignacion || null,
      })
    );
  }

  if (user.rol === 'operador' || user.rol === 'admin' || user.rol === 'supervisor') {
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

  const estadoAsignacion = String(item.estado_asignacion || '').toLowerCase();
  const hasActiveAssignment =
    Boolean(item.id_conductor_asignado) && ['programada', 'en_proceso'].includes(estadoAsignacion);

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
    fecha_asignacion_sugerida: item.fecha_salida_asignacion || item.fecha_estimada_entrega || item.fecha_creacion,
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
    asignacion: hasActiveAssignment
      ? {
          id_asignacion: item.id_asignacion,
          estado_asignacion: item.estado_asignacion,
          fecha_salida: item.fecha_salida_asignacion,
          id_conductor: item.id_conductor_asignado,
          conductor_nombre: item.conductor_nombre,
          conductor_correo: item.conductor_correo,
        }
      : null,
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

function ensureEditableStatus(status) {
  if (status !== 'pendiente') {
    const error = new Error('Solo puedes modificar o cancelar envios en estado pendiente.');
    error.statusCode = 409;
    throw error;
  }
}

async function ensureClientOwnsShipment(userId, idEnvio) {
  const parsedUserId = Number(userId);
  const parsedShipmentId = Number(idEnvio);

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    const error = new Error('El id de usuario no es valido.');
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isInteger(parsedShipmentId) || parsedShipmentId <= 0) {
    const error = new Error('El id de envio no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserById(parsedUserId);

  if (!user) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (user.rol !== 'cliente') {
    const error = new Error('Solo los clientes pueden modificar sus envios.');
    error.statusCode = 403;
    throw error;
  }

  const clientId = await findClientIdByUserId(parsedUserId);

  if (!clientId) {
    const error = new Error('Cliente no encontrado para este usuario.');
    error.statusCode = 404;
    throw error;
  }

  const shipment = await findShipmentById(parsedShipmentId);

  if (!shipment) {
    const error = new Error('Envio no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (shipment.remitente_id !== clientId) {
    const error = new Error('No puedes modificar un envio que no creaste.');
    error.statusCode = 403;
    throw error;
  }

  ensureEditableStatus(shipment.estado_envio);

  return parsedShipmentId;
}

export async function updateShipmentByClient({ userId, idEnvio, changes }) {
  const shipmentId = await ensureClientOwnsShipment(userId, idEnvio);

  const sanitizedChanges = {
    direccion_origen:
      changes?.direccion_origen !== undefined
        ? String(changes.direccion_origen).trim()
        : undefined,
    direccion_destino:
      changes?.direccion_destino !== undefined
        ? String(changes.direccion_destino).trim()
        : undefined,
    ciudad_origen:
      changes?.ciudad_origen !== undefined
        ? String(changes.ciudad_origen).trim()
        : undefined,
    ciudad_destino:
      changes?.ciudad_destino !== undefined
        ? String(changes.ciudad_destino).trim()
        : undefined,
  };

  const hasAtLeastOneChange = Object.values(sanitizedChanges).some((value) => value !== undefined);

  if (!hasAtLeastOneChange) {
    const error = new Error('No se recibieron cambios para actualizar.');
    error.statusCode = 400;
    throw error;
  }

  const invalidEmptyField = Object.values(sanitizedChanges).some(
    (value) => value !== undefined && value.length === 0
  );

  if (invalidEmptyField) {
    const error = new Error('Los campos enviados no pueden estar vacios.');
    error.statusCode = 400;
    throw error;
  }

  await updateShipmentBasicDataById(shipmentId, sanitizedChanges);

  return getShipmentDetailById(shipmentId);
}

export async function cancelShipmentByClient({ userId, idEnvio }) {
  const parsedUserId = Number(userId);
  const parsedShipmentId = Number(idEnvio);

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    const error = new Error('El id de usuario no es valido.');
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isInteger(parsedShipmentId) || parsedShipmentId <= 0) {
    const error = new Error('El id de envio no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserById(parsedUserId);

  if (!user) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (user.rol === 'cliente') {
    const shipmentId = await ensureClientOwnsShipment(parsedUserId, parsedShipmentId);
    await cancelShipmentById(shipmentId);
    return getShipmentDetailById(shipmentId);
  }

  if (!['conductor', 'operador', 'admin', 'supervisor'].includes(user.rol)) {
    const error = new Error('Tu rol no tiene permisos para cancelar envios.');
    error.statusCode = 403;
    throw error;
  }

  const shipment = await findShipmentById(parsedShipmentId);

  if (!shipment) {
    const error = new Error('Envio no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  const currentStatus = String(shipment.estado_envio || '').toLowerCase();
  if (currentStatus === 'entregado') {
    const error = new Error('No se puede cancelar un envio entregado.');
    error.statusCode = 409;
    throw error;
  }

  if (currentStatus === 'cancelado') {
    const error = new Error('El envio ya esta cancelado.');
    error.statusCode = 409;
    throw error;
  }

  await cancelShipmentById(parsedShipmentId);

  return getShipmentDetailById(parsedShipmentId);
}

export async function markShipmentDeliveredByDriver({ userId, idEnvio }) {
  const parsedUserId = Number(userId);
  const parsedShipmentId = Number(idEnvio);

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    const error = new Error('El id de usuario no es valido.');
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isInteger(parsedShipmentId) || parsedShipmentId <= 0) {
    const error = new Error('El id de envio no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserById(parsedUserId);

  if (!user) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (!['conductor', 'operador', 'admin', 'supervisor'].includes(user.rol)) {
    const error = new Error('Tu rol no tiene permisos para marcar envios como entregados.');
    error.statusCode = 403;
    throw error;
  }

  const shipment = await findShipmentById(parsedShipmentId);

  if (!shipment) {
    const error = new Error('Envio no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  const currentStatus = String(shipment.estado_envio || '').toLowerCase();
  if (currentStatus === 'entregado') {
    const error = new Error('El envio ya fue marcado como entregado.');
    error.statusCode = 409;
    throw error;
  }

  if (currentStatus === 'cancelado') {
    const error = new Error('No se puede marcar como entregado un envio cancelado.');
    error.statusCode = 409;
    throw error;
  }

  await markShipmentAsDeliveredByDriver({
    idEnvio: parsedShipmentId,
    ubicacionActual: shipment.ciudad_destino,
    observaciones: `Entrega confirmada por ${user.nombre || 'conductor'}`,
  });

  return getShipmentDetailById(parsedShipmentId);
}

function roundTo2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function sanitizeText(value) {
  return String(value ?? '').trim();
}

function generateTrackingCode() {
  const randomPart = Math.floor(Math.random() * 900 + 100);
  return `MTZ${Date.now().toString().slice(-8)}${randomPart}`;
}

export async function createShipmentByClient({ userId, payload }) {
  const parsedUserId = Number(userId);

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    const error = new Error('El id de usuario no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserById(parsedUserId);

  if (!user) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (!['cliente', 'operador', 'admin'].includes(user.rol)) {
    const error = new Error('Tu rol no tiene permisos para crear envios.');
    error.statusCode = 403;
    throw error;
  }

  const remitente = {
    nombre: sanitizeText(payload?.remitente?.nombre),
    telefono: sanitizeText(payload?.remitente?.telefono),
    correo: sanitizeText(payload?.remitente?.correo),
    direccion: sanitizeText(payload?.remitente?.direccion),
    ciudad: sanitizeText(payload?.remitente?.ciudad),
  };

  const destinatario = {
    nombre: sanitizeText(payload?.destinatario?.nombre),
    telefono: sanitizeText(payload?.destinatario?.telefono),
    correo: sanitizeText(payload?.destinatario?.correo),
    direccion: sanitizeText(payload?.destinatario?.direccion),
    ciudad: sanitizeText(payload?.destinatario?.ciudad),
    estado: sanitizeText(payload?.destinatario?.estado) || sanitizeText(payload?.destinatario?.ciudad),
    codigo_postal: sanitizeText(payload?.destinatario?.codigo_postal) || '00000',
  };

  const paquete = {
    descripcion: sanitizeText(payload?.paquete?.descripcion),
    tipo_contenido: sanitizeText(payload?.paquete?.tipo_contenido),
    peso: Number(payload?.paquete?.peso || 0),
    largo: payload?.paquete?.largo ? Number(payload.paquete.largo) : null,
    ancho: payload?.paquete?.ancho ? Number(payload.paquete.ancho) : null,
    alto: payload?.paquete?.alto ? Number(payload.paquete.alto) : null,
    valor_declarado: payload?.paquete?.valor_declarado ? Number(payload.paquete.valor_declarado) : 0,
    tipo_servicio: sanitizeText(payload?.paquete?.tipo_servicio) || 'normal',
  };

  if (!remitente.direccion || !remitente.ciudad) {
    const error = new Error('La direccion y ciudad de origen son obligatorias.');
    error.statusCode = 400;
    throw error;
  }

  let senderClientId = null;

  if (user.rol === 'cliente') {
    senderClientId = await findClientIdByUserId(parsedUserId);

    if (!senderClientId) {
      const error = new Error('No se encontro el cliente asociado a este usuario.');
      error.statusCode = 404;
      throw error;
    }

    await updateClientProfileById(senderClientId, {
      ...(remitente.nombre ? { nombre: remitente.nombre } : {}),
      ...(remitente.telefono ? { telefono: remitente.telefono } : {}),
      ...(remitente.correo ? { correo: remitente.correo.toLowerCase() } : {}),
    });
  }

  if (!destinatario.nombre || !destinatario.direccion || !destinatario.ciudad) {
    const error = new Error('Nombre, direccion y ciudad del destinatario son obligatorios.');
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isFinite(paquete.peso) || paquete.peso <= 0) {
    const error = new Error('El peso del paquete debe ser mayor a 0.');
    error.statusCode = 400;
    throw error;
  }

  if (!['express', 'normal', 'economico'].includes(paquete.tipo_servicio)) {
    const error = new Error('El tipo de servicio no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const volumen =
    paquete.largo && paquete.ancho && paquete.alto
      ? roundTo2((paquete.largo * paquete.ancho * paquete.alto) / 1000000)
      : null;

  const costoBase = Math.max(120, paquete.peso * 35);
  const costoPorValorDeclarado = paquete.valor_declarado > 0 ? paquete.valor_declarado * 0.01 : 0;
  const costoTotal = roundTo2(costoBase + costoPorValorDeclarado);

  const fechaEstimada = new Date();
  fechaEstimada.setDate(fechaEstimada.getDate() + 2);

  const created = await createShipmentWithPackageByClient({
    id_cliente_remitente: senderClientId,
    remitente,
    destinatario,
    fecha_estimada_entrega: fechaEstimada,
    costo_total: costoTotal,
    paquete: {
      ...paquete,
      volumen,
      codigo_rastreo: generateTrackingCode(),
    },
  });

  return getShipmentDetailById(created.id_envio);
}
