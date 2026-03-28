import { autoAssignShipment } from '../services/asignacionesService.js';

export async function autoAssignEnvio(req, res, next) {
  try {
    const { idEnvio } = req.params;
    const { idUsuario } = req.body ?? {};

    const result = await autoAssignShipment({
      idEnvio,
      idUsuario,
    });

    res.json({
      ok: true,
      message:
        result.action === 'already_assigned'
          ? 'El envio ya tenia una asignacion activa.'
          : 'Envio autoasignado correctamente.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
