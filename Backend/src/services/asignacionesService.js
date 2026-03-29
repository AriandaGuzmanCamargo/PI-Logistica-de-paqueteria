import { findUserById } from '../repositories/enviosRepository.js';
import {
  createActiveAssignment,
  findAvailableDriverById,
  findActiveAssignmentForShipment,
  findBestConductorId,
  findBestRouteId,
  findBestVehicleId,
  findShipmentStatus,
  hasAssignmentInfrastructure,
  linkShipmentToAssignment,
  listAvailableDrivers,
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
