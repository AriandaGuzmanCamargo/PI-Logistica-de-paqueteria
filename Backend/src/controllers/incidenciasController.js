import { getIncidenciasByUser } from '../services/incidenciasService.js';

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
