import express from 'express';
import validate from '../../middleware/validate.js';
import productValidation from '../../validation/product.validation.js';
import productController from '../../controller/product.controller.js';

const router = express.Router();

router
  .route('/')
  .get( validate(productValidation.getProducts),productController.getProducts);

  router
  .route('/:productId')
  .get( validate(productValidation.getProduct), productController.getProduct)


export default router;