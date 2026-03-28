import { Router } from 'express';
import { getIncidenciasByUsuario } from '../controllers/incidenciasController.js';

const incidenciasRouter = Router();

incidenciasRouter.get('/usuario/:idUsuario', getIncidenciasByUsuario);

export default incidenciasRouter;
