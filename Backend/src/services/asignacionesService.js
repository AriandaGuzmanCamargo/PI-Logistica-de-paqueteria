import {
  findShipmentById,
  findUserById,
  findUserIdsByClientIds,
} from '../repositories/enviosRepository.js';
import { notifyUsersByIds } from './notificacionesService.js';
import {
  cancelActiveAssignmentForShipment,
  createActiveAssignment,
  findDriverByConductorId,
  findAvailableDriverById,
  findActiveAssignmentForShipment,
  findBestConductorId,
  findBestRouteId,
  findBestVehicleId,
  findShipmentStatus,
  hasAssignmentInfrastructure,
  linkShipmentToAssignment,
  listAvailableDrivers,
  listDriverAssignedShipmentsByConductorId,
  listDriversSummary,
  markShipmentAsPending,
  markShipmentAsInRoute,
} from '../repositories/asignacionesRepository.js';

function toInteger(value) {
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
}

function normalizeDate(dateValue) {
  if (!dateValue) {
    return null;
  }

  const parsed = new Date(dateValue);

  if (Number.isNaN(parsed.getTime())) {
    const error = new Error('La fecha de asignacion no es valida.');
    error.statusCode = 400;
    throw error;
  }

  return parsed.toISOString().slice(0, 10);
}

async function collectNotificationUserIdsForShipment({
  idEnvio,
  idConductor = null,
  idConductoresPrevios = [],
}) {
  const shipment = await findShipmentById(idEnvio);
  const userIds = [];

  if (shipment) {
    const clientUserIds = await findUserIdsByClientIds([
      shipment.remitente_id,
      shipment.destinatario_id,
    ]);
    userIds.push(...clientUserIds);
  }

  const allConductorIds = [...new Set([
    idConductor,
    ...(Array.isArray(idConductoresPrevios) ? idConductoresPrevios : []),
  ])]
    .map((value) => toInteger(value))
    .filter((value) => Number.isInteger(value) && value > 0);

  if (allConductorIds.length > 0) {
    const drivers = await Promise.all(allConductorIds.map((value) => findDriverByConductorId(value)));
    drivers.forEach((driver) => {
      if (driver?.id_usuario) {
        userIds.push(driver.id_usuario);
      }
    });
  }

  return [...new Set(userIds.map((id) => Number(id)).filter((id) => Number.isInteger(id) && id > 0))];
}

async function notifyAssignmentStakeholders({
  idEnvio,
  titulo,
  mensaje,
  idConductor = null,
  idConductoresPrevios = [],
}) {
  if (!idEnvio || !titulo || !mensaje) {
    return;
  }

  const userIds = await collectNotificationUserIdsForShipment({
    idEnvio,
    idConductor,
    idConductoresPrevios,
  });

  if (userIds.length === 0) {
    return;
  }

  await notifyUsersByIds(userIds, {
    titulo,
    mensaje,
    idEnvio,
  });
}

export async function autoAssignShipment({ idEnvio, idUsuario }) {
  const parsedShipmentId = toInteger(idEnvio);
  const parsedUserId = toInteger(idUsuario);

  if (!parsedShipmentId || parsedShipmentId <= 0) {
    const error = new Error('El id de envio no es valido.');
    error.statusCode = 400;
    throw error;
  }

  if (!parsedUserId || parsedUserId <= 0) {
    const error = new Error('El id de usuario operador es requerido.');
    error.statusCode = 400;
    throw error;
  }

  const actor = await findUserById(parsedUserId);

  if (!actor) {
    const error = new Error('Usuario operador no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (!['operador', 'admin', 'supervisor'].includes(actor.rol)) {
    const error = new Error('No tienes permisos para autoasignar.');
    error.statusCode = 403;
    throw error;
  }

  const hasInfra = await hasAssignmentInfrastructure();

  if (!hasInfra) {
    const error = new Error('No existe la infraestructura completa de asignaciones en la base de datos.');
    error.statusCode = 409;
    throw error;
  }

  const shipment = await findShipmentStatus(parsedShipmentId);

  if (!shipment) {
    const error = new Error('Envio no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (['entregado', 'cancelado'].includes(String(shipment.estado_envio || '').toLowerCase())) {
    const error = new Error('No se puede autoasignar un envio entregado o cancelado.');
    error.statusCode = 409;
    throw error;
  }

  const existingAssignment = await findActiveAssignmentForShipment(parsedShipmentId);

  if (existingAssignment) {
    return {
      id_envio: parsedShipmentId,
      id_asignacion: existingAssignment.id_asignacion,
      id_conductor: existingAssignment.id_conductor,
      id_vehiculo: existingAssignment.id_vehiculo,
      id_ruta: existingAssignment.id_ruta,
      estado_asignacion: existingAssignment.estado_asignacion,
      action: 'already_assigned',
      assigned_by: parsedUserId,
    };
  }

  const idConductor = await findBestConductorId();
  const idVehiculo = await findBestVehicleId();
  const idRuta = await findBestRouteId();

  if (!idConductor || !idVehiculo || !idRuta) {
    const error = new Error('No hay conductor, vehiculo o ruta disponible para autoasignar.');
    error.statusCode = 409;
    throw error;
  }

  const assignment = await createActiveAssignment({
    idConductor,
    idVehiculo,
    idRuta,
  });

  await linkShipmentToAssignment({
    idEnvio: parsedShipmentId,
    idAsignacion: assignment.id_asignacion,
  });

  await markShipmentAsInRoute(parsedShipmentId);

  try {
    await notifyAssignmentStakeholders({
      idEnvio: parsedShipmentId,
      idConductor: assignment.id_conductor,
      titulo: 'Envio asignado',
      mensaje: `El envio #${parsedShipmentId} fue asignado automaticamente a un conductor.`,
    });
  } catch (notificationError) {
    console.error('No se pudo generar notificacion de autoasignacion:', notificationError);
  }

  return {
    id_envio: parsedShipmentId,
    id_asignacion: assignment.id_asignacion,
    id_conductor: assignment.id_conductor,
    id_vehiculo: assignment.id_vehiculo,
    id_ruta: assignment.id_ruta,
    estado_asignacion: assignment.estado_asignacion,
    action: 'assigned',
    assigned_by: parsedUserId,
  };
}

export async function getAvailableDrivers({ fechaAsignacion } = {}) {
  const hasInfra = await hasAssignmentInfrastructure();

  if (!hasInfra) {
    return [];
  }

  const normalizedDate = normalizeDate(fechaAsignacion);
  const drivers = await listAvailableDrivers(normalizedDate);

  return drivers.map((driver) => ({
    id_conductor: driver.id_conductor,
    id_usuario: driver.id_usuario,
    nombre: `${driver.nombre} ${driver.apellido}`.trim(),
    correo: driver.correo,
    foto_perfil_url: driver.foto_perfil_url || null,
  }));
}

export async function assignShipmentToSelectedDriver({ idEnvio, idUsuario, idConductor, fechaAsignacion }) {
  const parsedShipmentId = toInteger(idEnvio);
  const parsedUserId = toInteger(idUsuario);
  const parsedDriverId = toInteger(idConductor);
  const normalizedDate = normalizeDate(fechaAsignacion);

  if (!parsedShipmentId || parsedShipmentId <= 0) {
    const error = new Error('El id de envio no es valido.');
    error.statusCode = 400;
    throw error;
  }

  if (!parsedUserId || parsedUserId <= 0) {
    const error = new Error('El id de usuario operador es requerido.');
    error.statusCode = 400;
    throw error;
  }

  if (!parsedDriverId || parsedDriverId <= 0) {
    const error = new Error('El id de conductor es requerido.');
    error.statusCode = 400;
    throw error;
  }

  const actor = await findUserById(parsedUserId);

  if (!actor) {
    const error = new Error('Usuario operador no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (!['operador', 'admin', 'supervisor'].includes(actor.rol)) {
    const error = new Error('No tienes permisos para asignar manualmente.');
    error.statusCode = 403;
    throw error;
  }

  const hasInfra = await hasAssignmentInfrastructure();

  if (!hasInfra) {
    const error = new Error('No existe la infraestructura completa de asignaciones en la base de datos.');
    error.statusCode = 409;
    throw error;
  }

  const shipment = await findShipmentStatus(parsedShipmentId);

  if (!shipment) {
    const error = new Error('Envio no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (['entregado', 'cancelado'].includes(String(shipment.estado_envio || '').toLowerCase())) {
    const error = new Error('No se puede asignar un envio entregado o cancelado.');
    error.statusCode = 409;
    throw error;
  }

  const existingAssignment = await findActiveAssignmentForShipment(parsedShipmentId);

  if (existingAssignment) {
    return {
      id_envio: parsedShipmentId,
      id_asignacion: existingAssignment.id_asignacion,
      id_conductor: existingAssignment.id_conductor,
      id_vehiculo: existingAssignment.id_vehiculo,
      id_ruta: existingAssignment.id_ruta,
      estado_asignacion: existingAssignment.estado_asignacion,
      action: 'already_assigned',
      assigned_by: parsedUserId,
    };
  }

  const conductor = await findAvailableDriverById(parsedDriverId, normalizedDate);

  if (!conductor) {
    const error = new Error('El conductor seleccionado no esta disponible.');
    error.statusCode = 409;
    throw error;
  }

  const idVehiculo = await findBestVehicleId();
  const idRuta = await findBestRouteId();

  if (!idVehiculo || !idRuta) {
    const error = new Error('No hay vehiculo o ruta disponible para asignar.');
    error.statusCode = 409;
    throw error;
  }

  const assignment = await createActiveAssignment({
    idConductor: parsedDriverId,
    idVehiculo,
    idRuta,
    fechaProgramada: normalizedDate,
  });

  await linkShipmentToAssignment({
    idEnvio: parsedShipmentId,
    idAsignacion: assignment.id_asignacion,
  });

  await markShipmentAsInRoute(parsedShipmentId);

  try {
    await notifyAssignmentStakeholders({
      idEnvio: parsedShipmentId,
      idConductor: assignment.id_conductor,
      titulo: 'Envio asignado',
      mensaje: `El envio #${parsedShipmentId} fue asignado por ${actor.rol}.`,
    });
  } catch (notificationError) {
    console.error('No se pudo generar notificacion de asignacion manual:', notificationError);
  }

  return {
    id_envio: parsedShipmentId,
    id_asignacion: assignment.id_asignacion,
    id_conductor: assignment.id_conductor,
    id_vehiculo: assignment.id_vehiculo,
    id_ruta: assignment.id_ruta,
    estado_asignacion: assignment.estado_asignacion,
    action: 'assigned',
    assigned_by: parsedUserId,
  };
}

export async function getDriversSummary({ idUsuario }) {
  const parsedUserId = toInteger(idUsuario);

  if (!parsedUserId || parsedUserId <= 0) {
    const error = new Error('El id de usuario es requerido.');
    error.statusCode = 400;
    throw error;
  }

  const actor = await findUserById(parsedUserId);

  if (!actor) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (!['supervisor', 'admin', 'operador'].includes(actor.rol)) {
    const error = new Error('No tienes permisos para consultar conductores.');
    error.statusCode = 403;
    throw error;
  }

  const hasInfra = await hasAssignmentInfrastructure();

  if (!hasInfra) {
    return [];
  }

  const rows = await listDriversSummary();

  return rows.map((row) => {
    const isActive = row.estado_usuario === 'activo' && row.estado_conductor === 'activo';
    const status = !isActive
      ? 'fuera_servicio'
      : row.id_asignacion
        ? 'en_ruta'
        : 'sin_asignacion';

    return {
      id_conductor: row.id_conductor,
      id_usuario: row.id_usuario,
      nombre: `${row.nombre} ${row.apellido}`.trim(),
      correo: row.correo,
      foto_perfil_url: row.foto_perfil_url || null,
      estado: status,
      total_envios: Number(row.total_envios || 0),
      asignacion_activa: row.id_asignacion
        ? {
            id_asignacion: row.id_asignacion,
            estado_asignacion: row.estado_asignacion,
            fecha_salida: row.fecha_salida,
            ruta_nombre: row.ruta_nombre,
            ruta_destino: row.ruta_destino,
            vehiculo_placa: row.vehiculo_placa,
          }
        : null,
    };
  });
}

export async function getDriverDetailForSupervisor({ idUsuario, idConductor }) {
  const parsedUserId = toInteger(idUsuario);
  const parsedDriverId = toInteger(idConductor);

  if (!parsedUserId || parsedUserId <= 0) {
    const error = new Error('El id de usuario es requerido.');
    error.statusCode = 400;
    throw error;
  }

  if (!parsedDriverId || parsedDriverId <= 0) {
    const error = new Error('El id de conductor es requerido.');
    error.statusCode = 400;
    throw error;
  }

  const actor = await findUserById(parsedUserId);

  if (!actor) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (!['supervisor', 'admin', 'operador'].includes(actor.rol)) {
    const error = new Error('No tienes permisos para consultar detalle de conductor.');
    error.statusCode = 403;
    throw error;
  }

  const hasInfra = await hasAssignmentInfrastructure();

  if (!hasInfra) {
    const error = new Error('No existe la infraestructura de asignaciones en la base de datos.');
    error.statusCode = 409;
    throw error;
  }

  const driver = await findDriverByConductorId(parsedDriverId);

  if (!driver) {
    const error = new Error('Conductor no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  const shipments = await listDriverAssignedShipmentsByConductorId(parsedDriverId);

  const isActive = driver.estado_usuario === 'activo' && driver.estado_conductor === 'activo';
  const status = !isActive
    ? 'fuera_servicio'
    : shipments.length > 0
      ? 'en_ruta'
      : 'sin_asignacion';

  return {
    conductor: {
      id_conductor: driver.id_conductor,
      id_usuario: driver.id_usuario,
      nombre: `${driver.nombre} ${driver.apellido}`.trim(),
      correo: driver.correo,
      telefono: driver.telefono,
      foto_perfil_url: driver.foto_perfil_url || null,
      estado: status,
    },
    resumen: {
      total_envios: shipments.length,
      pendientes: shipments.filter((item) => item.estado_envio === 'pendiente').length,
      en_ruta: shipments.filter((item) => item.estado_envio === 'en_ruta').length,
      entregados: shipments.filter((item) => item.estado_envio === 'entregado').length,
      retrasados: shipments.filter((item) => item.estado_envio === 'retrasado').length,
    },
    envios: shipments.map((item) => ({
      id_envio: item.id_envio,
      estado_envio: item.estado_envio,
      direccion_origen: item.direccion_origen,
      direccion_destino: item.direccion_destino,
      ciudad_origen: item.ciudad_origen,
      ciudad_destino: item.ciudad_destino,
      fecha_creacion: item.fecha_creacion,
      fecha_estimada_entrega: item.fecha_estimada_entrega,
      costo_total: item.costo_total,
      destinatario: {
        nombre: item.destinatario_nombre,
        telefono: item.destinatario_telefono,
      },
      paquete: {
        codigo_rastreo: item.codigo_rastreo,
        tipo_servicio: item.tipo_servicio,
        estado_actual: item.estado_paquete,
      },
      asignacion: {
        id_asignacion: item.id_asignacion,
        estado_asignacion: item.estado_asignacion,
        fecha_salida: item.fecha_salida,
        fecha_llegada: item.fecha_llegada,
        ruta_nombre: item.nombre_ruta,
        ruta_origen: item.ruta_origen,
        ruta_destino: item.ruta_destino,
        vehiculo_placa: item.vehiculo_placa,
      },
    })),
  };
}

export async function reassignShipmentByAdmin({ idEnvio, idUsuario, idConductor, fechaAsignacion }) {
  const parsedShipmentId = toInteger(idEnvio);
  const parsedUserId = toInteger(idUsuario);
  const parsedDriverId = idConductor === undefined || idConductor === null || idConductor === ''
    ? null
    : toInteger(idConductor);
  const normalizedDate = normalizeDate(fechaAsignacion);

  if (!parsedShipmentId || parsedShipmentId <= 0) {
    const error = new Error('El id de envio no es valido.');
    error.statusCode = 400;
    throw error;
  }

  if (!parsedUserId || parsedUserId <= 0) {
    const error = new Error('El id de usuario admin es requerido.');
    error.statusCode = 400;
    throw error;
  }

  if (parsedDriverId !== null && (!parsedDriverId || parsedDriverId <= 0)) {
    const error = new Error('El id de conductor no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const actor = await findUserById(parsedUserId);

  if (!actor) {
    const error = new Error('Usuario admin/supervisor no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (!['admin', 'supervisor'].includes(actor.rol)) {
    const error = new Error('No tienes permisos para reasignar envios.');
    error.statusCode = 403;
    throw error;
  }

  const hasInfra = await hasAssignmentInfrastructure();

  if (!hasInfra) {
    const error = new Error('No existe la infraestructura completa de asignaciones en la base de datos.');
    error.statusCode = 409;
    throw error;
  }

  const shipment = await findShipmentStatus(parsedShipmentId);

  if (!shipment) {
    const error = new Error('Envio no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (['entregado', 'cancelado'].includes(String(shipment.estado_envio || '').toLowerCase())) {
    const error = new Error('No se puede reasignar un envio entregado o cancelado.');
    error.statusCode = 409;
    throw error;
  }

  const cancelledAssignments = await cancelActiveAssignmentForShipment(parsedShipmentId);
  const previousDriverIds = [...new Set(
    cancelledAssignments
      .map((row) => toInteger(row?.id_conductor))
      .filter((value) => Number.isInteger(value) && value > 0)
  )];
  await markShipmentAsPending(parsedShipmentId);

  if (parsedDriverId === null) {
    if (cancelledAssignments.length === 0) {
      const error = new Error('El envio no tenia una asignacion activa para cancelar.');
      error.statusCode = 409;
      throw error;
    }

    try {
      await notifyAssignmentStakeholders({
        idEnvio: parsedShipmentId,
        idConductoresPrevios: previousDriverIds,
        titulo: 'Envio sin asignacion',
        mensaje: `El envio #${parsedShipmentId} quedo sin conductor asignado por ${actor.rol}.`,
      });
    } catch (notificationError) {
      console.error('No se pudo generar notificacion de desasignacion:', notificationError);
    }

    return {
      id_envio: parsedShipmentId,
      action: 'unassigned',
      cancelled_assignments: cancelledAssignments.length,
      assigned_by: parsedUserId,
    };
  }

  const conductor = await findAvailableDriverById(parsedDriverId, normalizedDate);

  if (!conductor) {
    const error = new Error('El conductor seleccionado no esta disponible para reasignar.');
    error.statusCode = 409;
    throw error;
  }

  const idVehiculo = await findBestVehicleId();
  const idRuta = await findBestRouteId();

  if (!idVehiculo || !idRuta) {
    const error = new Error('No hay vehiculo o ruta disponible para reasignar.');
    error.statusCode = 409;
    throw error;
  }

  const assignment = await createActiveAssignment({
    idConductor: parsedDriverId,
    idVehiculo,
    idRuta,
    fechaProgramada: normalizedDate,
  });

  await linkShipmentToAssignment({
    idEnvio: parsedShipmentId,
    idAsignacion: assignment.id_asignacion,
  });

  await markShipmentAsInRoute(parsedShipmentId);

  try {
    await notifyAssignmentStakeholders({
      idEnvio: parsedShipmentId,
      idConductor: assignment.id_conductor,
      idConductoresPrevios: previousDriverIds,
      titulo: 'Envio reasignado',
      mensaje: `El envio #${parsedShipmentId} fue reasignado por ${actor.rol}.`,
    });
  } catch (notificationError) {
    console.error('No se pudo generar notificacion de reasignacion:', notificationError);
  }

  return {
    id_envio: parsedShipmentId,
    id_asignacion: assignment.id_asignacion,
    id_conductor: assignment.id_conductor,
    id_vehiculo: assignment.id_vehiculo,
    id_ruta: assignment.id_ruta,
    estado_asignacion: assignment.estado_asignacion,
    action: cancelledAssignments.length > 0 ? 'reassigned' : 'assigned',
    cancelled_assignments: cancelledAssignments.length,
    assigned_by: parsedUserId,
  };
}
