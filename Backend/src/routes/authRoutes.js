import { Router } from 'express';
import {
	recoverPassword,
	getPerfilUsuario,
	login,
	register,
	updatePassword,
	updatePerfilUsuario,
} from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/registro', register);
authRouter.post('/recuperar-contrasena', recoverPassword);
authRouter.get('/perfil/:idUsuario', getPerfilUsuario);
authRouter.patch('/perfil/:idUsuario', updatePerfilUsuario);
authRouter.patch('/cambiar-contrasena/:idUsuario', updatePassword);

export default authRouter;
