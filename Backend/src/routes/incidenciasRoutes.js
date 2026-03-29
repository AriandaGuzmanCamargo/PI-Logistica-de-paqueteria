import { Router } from 'express';
import {
	createIncidenciaByUsuario,
	getIncidenciasByUsuario,
} from '../controllers/incidenciasController.js';

const incidenciasRouter = Router();

incidenciasRouter.get('/usuario/:idUsuario', getIncidenciasByUsuario);
incidenciasRouter.post('/', createIncidenciaByUsuario);

export default incidenciasRouter;
