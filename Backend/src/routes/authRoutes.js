import { Router } from 'express';
import {
	createUsuarioByAdmin,
	getUsuariosGestionAdmin,
	recoverPassword,
	getPerfilUsuario,
	login,
	register,
	updatePassword,
	updatePasswordByAdmin,
	updatePerfilUsuario,
} from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/registro', register);
authRouter.post('/recuperar-contrasena', recoverPassword);
authRouter.get('/perfil/:idUsuario', getPerfilUsuario);
authRouter.patch('/perfil/:idUsuario', updatePerfilUsuario);
authRouter.patch('/cambiar-contrasena/:idUsuario', updatePassword);
authRouter.get('/usuarios-gestion', getUsuariosGestionAdmin);
authRouter.patch('/cambiar-contrasena-admin/:idUsuario', updatePasswordByAdmin);
authRouter.post('/usuarios-gestion', createUsuarioByAdmin);

export default authRouter;
