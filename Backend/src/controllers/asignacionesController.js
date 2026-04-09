import {
  assignShipmentToSelectedDriver,
  autoAssignShipment,
  getDriverDetailForSupervisor,
  getDriversSummary,
  getAvailableDrivers,
  reassignShipmentByAdmin,
} from "../services/asignacionesService.js";

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
        result.action === "already_assigned"
          ? "El envio ya tenia una asignacion activa."
          : "Envio autoasignado correctamente.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getConductoresDisponibles(req, res, next) {
  try {
    const { fecha } = req.query;
    const conductores = await getAvailableDrivers({ fechaAsignacion: fecha });

    res.json({
      ok: true,
      data: conductores,
    });
  } catch (error) {
    next(error);
  }
}

export async function assignEnvioConConductor(req, res, next) {
  try {
    const { idEnvio } = req.params;
    const { idUsuario, idConductor, fechaAsignacion } = req.body ?? {};

    const result = await assignShipmentToSelectedDriver({
      idEnvio,
      idUsuario,
      idConductor,
      fechaAsignacion,
    });

    res.json({
      ok: true,
      message:
        result.action === "already_assigned"
          ? "El envio ya tenia una asignacion activa."
          : "Envio asignado al conductor seleccionado.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getResumenConductores(req, res, next) {
  try {
    const { idUsuario } = req.query;

    const conductores = await getDriversSummary({ idUsuario });

    res.json({
      ok: true,
      data: conductores,
    });
  } catch (error) {
    next(error);
  }
}

export async function getDetalleConductor(req, res, next) {
  try {
    const { idUsuario, idConductor } = req.query;

    const detalle = await getDriverDetailForSupervisor({
      idUsuario,
      idConductor,
    });

    res.json({
      ok: true,
      data: detalle,
    });
  } catch (error) {
    next(error);
  }
}

export async function reassignEnvioPorAdmin(req, res, next) {
  try {
    const { idEnvio } = req.params;
    const { idUsuario, idConductor, fechaAsignacion } = req.body ?? {};

    const result = await reassignShipmentByAdmin({
      idEnvio,
      idUsuario,
      idConductor,
      fechaAsignacion,
    });

    res.json({
      ok: true,
      message:
        result.action === "unassigned"
          ? "Asignacion del envio cancelada correctamente."
          : result.action === "reassigned"
            ? "Envio reasignado al nuevo conductor correctamente."
            : "Envio asignado al conductor seleccionado.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
