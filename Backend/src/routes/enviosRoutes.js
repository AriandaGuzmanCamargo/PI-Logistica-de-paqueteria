import { Router } from 'express';
import {
	getDetalleEnvio,
	getEnviosByUsuario,
} from '../controllers/enviosController.js';

const enviosRouter = Router();

enviosRouter.get('/usuario/:idUsuario', getEnviosByUsuario);
enviosRouter.get('/detalle/:idEnvio', getDetalleEnvio);

export default enviosRouter;
