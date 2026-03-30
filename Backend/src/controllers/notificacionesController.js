import {
  getNotificationsByUser,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from '../services/notificacionesService.js';

export async function getNotificacionesByUsuario(req, res, next) {
  try {
    const { idUsuario } = req.params;
    const notificaciones = await getNotificationsByUser(idUsuario);

    res.json({
      ok: true,
      data: notificaciones,
    });
  } catch (error) {
    next(error);
  }
}

export async function marcarNotificacionComoLeida(req, res, next) {
  try {
    const { idNotificacion } = req.params;
    const { idUsuario } = req.body ?? {};

    const result = await markNotificationAsRead({
      userId: idUsuario,
      notificationId: idNotificacion,
    });

    res.json({
      ok: true,
      message: 'Notificacion marcada como leida.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function marcarTodasComoLeidas(req, res, next) {
  try {
    const { idUsuario } = req.params;

    const result = await markAllNotificationsAsRead({
      userId: idUsuario,
    });

    res.json({
      ok: true,
      message: 'Notificaciones actualizadas.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
