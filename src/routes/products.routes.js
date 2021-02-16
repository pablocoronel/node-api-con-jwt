import { Router } from 'express';
import * as productsController from '../controllers/products.controller';
import { authJWT } from '../middlewares';

const router = Router();

router.get('/', productsController.getProducts);

router.post(
	'/',
	[authJWT.verifyToken, authJWT.isModerator],
	productsController.createProducts
);

router.get('/:id', productsController.getProduct);

router.put(
	'/:id',
	[authJWT.verifyToken, authJWT.isAdmin],
	productsController.updateProduct
);

router.delete(
	'/:id',
	[authJWT.verifyToken, authJWT.isAdmin],
	productsController.deleteProduct
);

export default router;
