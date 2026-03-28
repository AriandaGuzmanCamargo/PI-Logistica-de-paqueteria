import {
  getShipmentDetailById,
  getShipmentsByUser,
} from '../services/enviosService.js';

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

export async function getDetalleEnvio(req, res, next) {
  try {
    const { idEnvio } = req.params;
    const envio = await getShipmentDetailById(idEnvio);

    res.json({
      ok: true,
      data: envio,
    });
  } catch (error) {
    next(error);
  }
}
