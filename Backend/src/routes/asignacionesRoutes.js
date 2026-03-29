import { Router } from 'express';
import {
    assignEnvioConConductor,
	autoAssignEnvio,
	getDetalleConductor,
	getResumenConductores,
	getConductoresDisponibles,
	reassignEnvioPorAdmin,
} from '../controllers/asignacionesController.js';

const asignacionesRouter = Router();

asignacionesRouter.get('/conductores-disponibles', getConductoresDisponibles);
asignacionesRouter.get('/conductores-resumen', getResumenConductores);
asignacionesRouter.get('/conductor-detalle', getDetalleConductor);
asignacionesRouter.post('/manual/:idEnvio', assignEnvioConConductor);
asignacionesRouter.post('/auto/:idEnvio', autoAssignEnvio);
asignacionesRouter.post('/reasignar/:idEnvio', reassignEnvioPorAdmin);

export default asignacionesRouter;
