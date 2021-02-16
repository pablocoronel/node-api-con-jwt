import { Router } from 'express';
import * as productsController from '../controllers/products.controller';
import { verifyToken } from '../middlewares';

const router = Router();

router.get('/', productsController.getProducts);

router.post('/', [verifyToken], productsController.createProducts);

router.get('/:id', productsController.getProduct);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

export default router;
