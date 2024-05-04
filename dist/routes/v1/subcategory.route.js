import express from 'express';
import validate from '../../middleware/validate.js';
import categoryValidation from '../../validation/category.validation.js';
import categoryController from '../../controller/category.controller.js';
const router = express.Router();
router
    .route('/')
    .get(validate(categoryValidation.getSubCategories), categoryController.getSubCategories);
router
    .route('/:subCategoryId')
    .get(validate(categoryValidation.getSubCategory), categoryController.getSubCategory);
export default router;
