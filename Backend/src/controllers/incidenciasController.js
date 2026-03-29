import {
  createIncidencia,
  getIncidenciasByUser,
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
