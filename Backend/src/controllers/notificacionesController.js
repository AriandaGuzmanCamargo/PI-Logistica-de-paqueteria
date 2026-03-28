import { getNotificationsByUser } from '../services/notificacionesService.js';

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
