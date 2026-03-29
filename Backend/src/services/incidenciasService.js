import {
  findUserById,
  listIncidenciasByReporter,
  listIncidenciasForOperator,
} from '../repositories/incidenciasRepository.js';

function mapIncidencia(item) {
  return {
    id_incidencia: item.id_incidencia,
    tipo_incidencia: item.tipo_incidencia,
    descripcion: item.descripcion,
    fecha_reporte: item.fecha_reporte,
    estado: item.estado,
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
