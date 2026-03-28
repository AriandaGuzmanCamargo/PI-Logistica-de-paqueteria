import {
  createDireccion,
  deleteDireccion,
  getDireccionesByUsuario,
  updateDireccion,
} from '../services/direccionesService.js';

export async function getDireccionesByUsuarioController(req, res, next) {
  try {
    const { idUsuario } = req.params;
    const data = await getDireccionesByUsuario(idUsuario);

    res.json({
      ok: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function createDireccionController(req, res, next) {
  try {
    const { idUsuario, ...payload } = req.body ?? {};

    const data = await createDireccion({
      idUsuario,
      payload,
    });

    res.status(201).json({
      ok: true,
      message: 'Direccion guardada correctamente.',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateDireccionController(req, res, next) {
  try {
    const { idDireccion } = req.params;
    const { idUsuario, ...payload } = req.body ?? {};

    const data = await updateDireccion({
      idUsuario,
      idDireccion,
      payload,
    });

    res.json({
      ok: true,
      message: 'Direccion actualizada correctamente.',
      data,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteDireccionController(req, res, next) {
  try {
    const { idDireccion } = req.params;
    const { idUsuario } = req.body ?? {};

    const data = await deleteDireccion({
      idUsuario,
      idDireccion,
    });

    res.json({
      ok: true,
      message: 'Direccion eliminada correctamente.',
      data,
    });
  } catch (error) {
    next(error);
  }
}
