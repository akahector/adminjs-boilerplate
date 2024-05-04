import express from 'express';
import validate from '../../middleware/validate.js';
import categoryValidation from '../../validation/category.validation.js';
import categoryController from '../../controller/category.controller.js';
const router = express.Router();
router
    .route('/')
    .get(validate(categoryValidation.getCategories), categoryController.getCategories);
router
    .route('/:categoryId')
    .get(validate(categoryValidation.getCategory), categoryController.getCategory);
export default router;
