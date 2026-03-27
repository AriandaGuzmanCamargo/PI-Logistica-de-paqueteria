import { Router } from 'express';
import { getEnviosByUsuario } from '../controllers/enviosController.js';

const enviosRouter = Router();

enviosRouter.get('/usuario/:idUsuario', getEnviosByUsuario);

export default enviosRouter;
