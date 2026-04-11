import { Router } from 'express';
import {
	cancelEnvioByCliente,
	createEnvioByCliente,
	getDetalleEnvio,
	getEnviosByUsuario,
	marcarEnvioComoEntregado,
	updateEnvioByCliente,
} from '../controllers/enviosController.js';
import { requireAuth } from '../Middelware/authMiddleware.js';

const enviosRouter = Router();

enviosRouter.post('/', requireAuth, createEnvioByCliente);
enviosRouter.get('/usuario/:idUsuario', getEnviosByUsuario);
enviosRouter.get('/detalle/:idEnvio', getDetalleEnvio);
enviosRouter.patch('/:idEnvio', updateEnvioByCliente);
enviosRouter.patch('/:idEnvio/cancelar', cancelEnvioByCliente);
enviosRouter.patch('/:idEnvio/entregar', marcarEnvioComoEntregado);

export default enviosRouter;
