import {
  findUserById,
  listNotificationsByUser,
  listNotificationsForOperator,
} from '../repositories/notificacionesRepository.js';

function mapNotification(item) {
  return {
    id_notificacion: item.id_notificacion,
    titulo: item.titulo,
    mensaje: item.mensaje,
    leida: item.leida,
    fecha: item.fecha,
    id_usuario: item.id_usuario ?? null,
  };
}

export async function getNotificationsByUser(userId) {
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

  const rows = user.rol === 'operador' || user.rol === 'admin'
    ? await listNotificationsForOperator()
    : await listNotificationsByUser(parsedId);

  return rows.map(mapNotification);
}
