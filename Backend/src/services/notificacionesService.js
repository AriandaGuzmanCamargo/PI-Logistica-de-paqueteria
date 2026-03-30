import {
  createNotificationsForUsers,
  findUserById,
  findUserIdsByRoles,
  listNotificationsByUser,
  listNotificationsForOperator,
  markAllNotificationsAsReadByUser,
  markNotificationAsReadByUser,
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

export async function notifyUsersByRoles(roles, { titulo, mensaje }) {
  const userIds = await findUserIdsByRoles(roles);
  return createNotificationsForUsers(userIds, { titulo, mensaje });
}

export async function markNotificationAsRead({ userId, notificationId }) {
  const parsedUserId = Number(userId);
  const parsedNotificationId = Number(notificationId);

  if (!Number.isInteger(parsedUserId) || parsedUserId <= 0) {
    const error = new Error('El id de usuario no es valido.');
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isInteger(parsedNotificationId) || parsedNotificationId <= 0) {
    const error = new Error('El id de notificacion no es valido.');
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserById(parsedUserId);

  if (!user) {
    const error = new Error('Usuario no encontrado.');
    error.statusCode = 404;
    throw error;
  }

  const updated = await markNotificationAsReadByUser(parsedNotificationId, parsedUserId);

  if (!updated) {
    const error = new Error('Notificacion no encontrada para este usuario.');
    error.statusCode = 404;
    throw error;
  }

  return {
    id_notificacion: updated.id_notificacion,
    id_usuario: updated.id_usuario,
    leida: updated.leida,
  };
}

export async function markAllNotificationsAsRead({ userId }) {
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

  const updatedCount = await markAllNotificationsAsReadByUser(parsedUserId);

  return {
    id_usuario: parsedUserId,
    actualizadas: updatedCount,
  };
}
