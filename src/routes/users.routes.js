import { Router } from 'express';
import * as usersController from '../controllers/users.controller';
import { authJWT, verifySingUp } from '../middlewares/index';

const router = Router();

router.post(
	'/',
	[authJWT.verifyToken, authJWT.isAdmin, verifySingUp.checkRolesExisted],
	usersController.createUser
);

export default router;
