import { Router } from 'express';
import {
  createDireccionController,
  deleteDireccionController,
  getDireccionesByUsuarioController,
  updateDireccionController,
} from '../controllers/direccionesController.js';

const direccionesRouter = Router();

direccionesRouter.get('/usuario/:idUsuario', getDireccionesByUsuarioController);
direccionesRouter.post('/', createDireccionController);
direccionesRouter.patch('/:idDireccion', updateDireccionController);
direccionesRouter.delete('/:idDireccion', deleteDireccionController);

export default direccionesRouter;
