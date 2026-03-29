import { Router } from 'express';
import {
	createIncidenciaByUsuario,
	getIncidenciasByUsuario,
	updateIncidenciaStatus,
} from '../controllers/incidenciasController.js';

const incidenciasRouter = Router();

incidenciasRouter.get('/usuario/:idUsuario', getIncidenciasByUsuario);
incidenciasRouter.post('/', createIncidenciaByUsuario);
incidenciasRouter.patch('/:idIncidencia', updateIncidenciaStatus);

export default incidenciasRouter;
