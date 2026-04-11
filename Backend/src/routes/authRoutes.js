import { Router } from 'express';
import {
	createUsuarioByAdmin,
	deleteUsuarioByAdmin,
	getUsuariosGestionAdmin,
	recoverPassword,
	getPerfilUsuario,
	login,
	register,
	updatePassword,
	updatePasswordByAdmin,
	updatePerfilUsuario,
	recoverPasswordByEmailHandler,
} from '../controllers/authController.js';
import { requireAdmin, requireAuth } from '../Middelware/authMiddleware.js';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/registro', register);
authRouter.post('/recuperar-contrasena', recoverPassword);
authRouter.post('/recuperar-contrasena-email', recoverPasswordByEmailHandler);
authRouter.get('/perfil/:idUsuario', requireAuth, getPerfilUsuario);
authRouter.patch('/perfil/:idUsuario', requireAuth, updatePerfilUsuario);
authRouter.patch('/cambiar-contrasena/:idUsuario', requireAuth, updatePassword);
authRouter.get('/usuarios-gestion', requireAuth, requireAdmin, getUsuariosGestionAdmin);
authRouter.patch('/cambiar-contrasena-admin/:idUsuario', requireAuth, requireAdmin, updatePasswordByAdmin);
authRouter.post('/usuarios-gestion', requireAuth, requireAdmin, createUsuarioByAdmin);
authRouter.delete('/usuarios-gestion/:idUsuario', requireAuth, requireAdmin, deleteUsuarioByAdmin);

export default authRouter;
