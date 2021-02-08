import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

router.post('/singup', authController.singUp);

router.post('/singin', authController.singIn);

export default router;
