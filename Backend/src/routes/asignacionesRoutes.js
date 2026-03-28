import { Router } from 'express';
import { autoAssignEnvio } from '../controllers/asignacionesController.js';

const asignacionesRouter = Router();

asignacionesRouter.post('/auto/:idEnvio', autoAssignEnvio);

export default asignacionesRouter;
