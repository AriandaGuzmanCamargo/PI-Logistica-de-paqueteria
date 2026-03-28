import { Router } from 'express';
import {
	getPerfilUsuario,
	login,
	updatePerfilUsuario,
} from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.get('/perfil/:idUsuario', getPerfilUsuario);
authRouter.patch('/perfil/:idUsuario', updatePerfilUsuario);

export default authRouter;
