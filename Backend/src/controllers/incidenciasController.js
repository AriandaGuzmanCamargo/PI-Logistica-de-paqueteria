import {
  createIncidencia,
  getIncidenciasByUser,
  updateIncidenciaStatusByOperator,
} from '../services/incidenciasService.js';

export async function getIncidenciasByUsuario(req, res, next) {
  try {
    const { idUsuario } = req.params;
    const incidencias = await getIncidenciasByUser(idUsuario);

    res.json({
      ok: true,
      data: incidencias,
    });
  } catch (error) {
    next(error);
  }
}

export async function createIncidenciaByUsuario(req, res, next) {
  try {
    const incidencia = await createIncidencia(req.body ?? {});

    res.status(201).json({
      ok: true,
      message: 'Incidencia registrada correctamente.',
      data: incidencia,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateIncidenciaStatus(req, res, next) {
  try {
    const { idIncidencia } = req.params;
    const { estado } = req.body ?? {};

    const result = await updateIncidenciaStatusByOperator(idIncidencia, estado);

    res.json({
      ok: true,
      message: `Incidencia actualizada a estado: ${result.estado}`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
