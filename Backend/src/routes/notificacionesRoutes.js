import { Router } from 'express';
import {
	getNotificacionesByUsuario,
	marcarNotificacionComoLeida,
	marcarTodasComoLeidas,
} from '../controllers/notificacionesController.js';

const notificacionesRouter = Router();

notificacionesRouter.get('/usuario/:idUsuario', getNotificacionesByUsuario);
notificacionesRouter.patch('/usuario/:idUsuario/leidas', marcarTodasComoLeidas);
notificacionesRouter.patch('/:idNotificacion/leida', marcarNotificacionComoLeida);

export default notificacionesRouter;
