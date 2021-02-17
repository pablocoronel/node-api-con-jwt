import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { verifySingUp } from '../middlewares/index';

const router = Router();

router.post(
	'/singup',
	[
		verifySingUp.checkIfUsernameOrEmailIsUnique,
		verifySingUp.checkRolesExisted,
	],
	authController.singUp
);

router.post('/singin', authController.singIn);

export default router;
