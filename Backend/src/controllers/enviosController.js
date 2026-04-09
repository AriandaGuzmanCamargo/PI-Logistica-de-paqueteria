import {
  cancelShipmentByClient,
  createShipmentByClient,
  getShipmentDetailById,
  getShipmentsByUser,
  markShipmentDeliveredByDriver,
  updateShipmentByClient,
} from "../services/enviosService.js";

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

export async function createEnvioByCliente(req, res, next) {
  try {
    const { idUsuario, ...payload } = req.body ?? {};

    const envio = await createShipmentByClient({
      userId: idUsuario,
      payload,
    });

    res.status(201).json({
      ok: true,
      message: "Envio creado correctamente.",
      data: envio,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateEnvioByCliente(req, res, next) {
  try {
    const { idEnvio } = req.params;
    const { idUsuario, ...changes } = req.body ?? {};

    const envio = await updateShipmentByClient({
      userId: idUsuario,
      idEnvio,
      changes,
    });

    res.json({
      ok: true,
      message: "Envio actualizado correctamente.",
      data: envio,
    });
  } catch (error) {
    next(error);
  }
}

export async function cancelEnvioByCliente(req, res, next) {
  try {
    const { idEnvio } = req.params;
    const { idUsuario } = req.body ?? {};

    const envio = await cancelShipmentByClient({
      userId: idUsuario,
      idEnvio,
    });

    res.json({
      ok: true,
      message: "Envio cancelado correctamente.",
      data: envio,
    });
  } catch (error) {
    next(error);
  }
}

export async function marcarEnvioComoEntregado(req, res, next) {
  try {
    const { idEnvio } = req.params;
    const {
      idUsuario,
      foto_entrega_url: fotoEntregaUrl,
      recibio_entrega_nombre: recibioEntregaNombre,
    } = req.body ?? {};

    const envio = await markShipmentDeliveredByDriver({
      userId: idUsuario,
      idEnvio,
      fotoEntregaUrl,
      recibioEntregaNombre,
    });

    res.json({
      ok: true,
      message: "Envio marcado como entregado correctamente.",
      data: envio,
    });
  } catch (error) {
    next(error);
  }
}
