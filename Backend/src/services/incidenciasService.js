import {
  createIncidenciaRow,
  findShipmentPackageById,
  findUserById,
  listIncidenciasByReporter,
  listIncidenciasForOperator,
  updateIncidenciaEstado,
} from '../repositories/incidenciasRepository.js';

function mapIncidencia(item) {
  return {
    id_incidencia: item.id_incidencia,
    tipo_incidencia: item.tipo_incidencia,
    descripcion: item.descripcion,
    fecha_reporte: item.fecha_reporte,
    estado: item.estado,
    foto_evidencia: item.foto_evidencia || null,
    envio: {
      id_envio: item.id_envio,
      estado_envio: item.estado_envio,
    },
    paquete: {
      codigo_rastreo: item.codigo_rastreo,
    },
    reportado_por: {
      id_usuario: item.reportado_por_id,
      nombre: item.reportado_por_nombre,
    },
  };
}

export async function getIncidenciasByUser(userId) {
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

  const rows = user.rol === 'operador' || user.rol === 'admin' || user.rol === 'supervisor'
    ? await listIncidenciasForOperator()
    : await listIncidenciasByReporter(parsedId);

  return rows.map(mapIncidencia);
}

function normalizeIncidenceType(value) {
  const normalized = String(value || '').toLowerCase().trim();

  if (
    normalized.includes('dañ') ||
    normalized.includes('dano') ||
    normalized.includes('golpe') ||
    normalized.includes('etiqueta')
  ) {
    return 'dano';
  }

  if (
    normalized.includes('extravi') ||
    normalized.includes('perdid')
  ) {
    return 'perdida';
  }

  return 'retraso';
}

export async function createIncidencia(payload) {
  const idUsuario = Number(payload?.idUsuario);
  const idEnvio = Number(payload?.idEnvio);
  const descripcion = String(payload?.descripcion || '').trim();
  const tipoInput = String(payload?.tipoIncidencia || '').trim();
  const fotoEvidencia = payload?.fotoEvidencia || null;

  if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
    const error = new Error('El id de usuario no es valido.');
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isInteger(idEnvio) || idEnvio <= 0) {
    const error = new Error('El id de envio no es valido.');
    error.statusCode = 400;
    throw error;
  }

  if (!tipoInput) {
    const error = new Error('El tipo de incidencia es obligatorio.');
    error.statusCode = 400;
    throw error;
  }

  if (!descripcion || descripcion.length < 5) {
    const error = new Error('La descripcion debe contener al menos 5 caracteres.');
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserById(idUsuario);

  if (!user) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  if (!['conductor', 'operador', 'admin', 'supervisor'].includes(user.rol)) {
    const error = new Error('No tienes permisos para registrar incidencias.');
    error.statusCode = 403;
    throw error;
  }

  const idPaquete = await findShipmentPackageById(idEnvio);

  if (!idPaquete) {
    const error = new Error('No se encontro un paquete asociado al envio.');
    error.statusCode = 404;
    throw error;
  }

  const tipoIncidencia = normalizeIncidenceType(tipoInput);

  const row = await createIncidenciaRow({
    idEnvio,
    idPaquete,
    idUsuario,
    tipoIncidencia,
    descripcion,
    fotoEvidencia,
  });

  return {
    id_incidencia: row.id_incidencia,
    id_envio: row.id_envio,
    id_paquete: row.id_paquete,
    id_usuario: row.id_usuario,
    tipo_incidencia: row.tipo_incidencia,
    descripcion: row.descripcion,
    foto_evidencia: row.foto_evidencia || null,
    fecha_reporte: row.fecha_reporte,
    estado: row.estado,
  };
}

export async function updateIncidenciaStatusByOperator(idIncidencia, nuevoEstado) {
  const parsedId = Number(idIncidencia);
  const estado = String(nuevoEstado || '').toLowerCase().trim();

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    const error = new Error('El id de incidencia no es valido.');
    error.statusCode = 400;
    throw error;
  }

  if (!['abierta', 'en_proceso', 'cerrada', 'cancelada'].includes(estado)) {
    const error = new Error('El estado debe ser: abierta, en_proceso, cerrada o cancelada.');
    error.statusCode = 400;
    throw error;
  }

  const row = await updateIncidenciaEstado(parsedId, estado);

  if (!row) {
    const error = new Error('Incidencia no encontrada.');
    error.statusCode = 404;
    throw error;
  }

  return {
    id_incidencia: row.id_incidencia,
    estado: row.estado,
  };
}
