import { getShipmentsByUser } from '../services/enviosService.js';

export async function getEnviosByUsuario(req, res, next) {
  try {
    const { idUsuario } = req.params;
    const envios = await getShipmentsByUser(idUsuario);

    res.json({
      ok: true,
      data: envios,
    });
  } catch (error) {
    next(error);
  }
}
