import { Router } from 'express';
import * as productsController from '../controllers/products.controller';
import { verifyToken } from '../middlewares';

const router = Router();

router.get('/', productsController.getProducts);

router.post('/', [verifyToken], productsController.createProducts);

router.get('/:id', productsController.getProduct);

router.put('/:id', [verifyToken], productsController.updateProduct);

router.delete('/:id', [verifyToken], productsController.deleteProduct);

export default router;
