import { getTrackingByCode } from '../services/trackingService.js';

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
