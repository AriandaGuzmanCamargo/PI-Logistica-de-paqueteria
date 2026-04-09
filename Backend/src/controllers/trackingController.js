import {
  getPublicTrackingByCode,
  getTrackingByCode,
} from '../services/trackingService.js';

export async function getTracking(req, res, next) {
  try {
    const { codigo } = req.params;
    const data = await getTrackingByCode(codigo);

    res.json({
      ok: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTrackingPublico(req, res, next) {
  try {
    const { codigo } = req.params;
    const { correo, telefono } = req.body ?? {};

    const data = await getPublicTrackingByCode({
      codigoRastreo: codigo,
      correo,
      telefono,
    });

    res.json({
      ok: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}
