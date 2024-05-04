import express from 'express';
import validate from '../../middleware/validate.js';
import authMiddleware from '../../middleware/auth.js';
import inquiryValidation from '../../validation/inquiry.validation.js';
import inquiryController from '../../controller/inquiry.controller.js';
const router = express.Router();
router
    .route('/')
    .get(validate(inquiryValidation.getAllIquiries), authMiddleware(), inquiryController.getInquiries)
    .post(validate(inquiryValidation.createInquiry), inquiryController.createInquiry);
router
    .route('/:inquiryId')
    .get(validate(inquiryValidation.getInquiry), authMiddleware(), inquiryController.getInquiry)
    .patch(validate(inquiryValidation.updateInquiry), authMiddleware(), inquiryController.updateInquiry)
    .delete(validate(inquiryValidation.deleteInquiry), authMiddleware(), inquiryController.deleteInquiry);
export default router;
