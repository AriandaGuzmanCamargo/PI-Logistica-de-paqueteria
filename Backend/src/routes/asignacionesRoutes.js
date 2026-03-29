import { Router } from 'express';
import {
    assignEnvioConConductor,
	autoAssignEnvio,
	getConductoresDisponibles,
} from '../controllers/asignacionesController.js';

const asignacionesRouter = Router();

asignacionesRouter.get('/conductores-disponibles', getConductoresDisponibles);
asignacionesRouter.post('/manual/:idEnvio', assignEnvioConConductor);
asignacionesRouter.post('/auto/:idEnvio', autoAssignEnvio);

export default asignacionesRouter;
