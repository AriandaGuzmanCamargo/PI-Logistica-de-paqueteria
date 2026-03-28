import { Router } from 'express';
import { getNotificacionesByUsuario } from '../controllers/notificacionesController.js';

const notificacionesRouter = Router();

notificacionesRouter.get('/usuario/:idUsuario', getNotificacionesByUsuario);

export default notificacionesRouter;
