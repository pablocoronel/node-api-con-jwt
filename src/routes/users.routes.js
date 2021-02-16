import { Router } from 'express';
import * as usersController from '../controllers/users.controller';
import { authJWT } from '../middlewares/index';

const router = Router();

router.post(
	'/',
	[authJWT.verifyToken, authJWT.isAdmin],
	usersController.createUser
);

export default router;
