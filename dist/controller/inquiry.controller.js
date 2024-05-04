import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import pick from '../utils/pick.js';
import inquiryService from '../service/inquiry.service.js';
const createInquiry = catchAsync(async (req, res) => {
    const { email, name, phone, message, product } = req.body;
    const inquiry = await inquiryService.createInquiry(email, name, phone, message, product);
    res.status(httpStatus.CREATED).send(inquiry);
});
const getInquiries = catchAsync(async (req, res) => {
    let filter = pick(req.query, ['name']);
    const { id } = req.user;
    filter = { ...filter, userId: id };
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await inquiryService.queryInquiries(filter, options);
    res.send(result);
});
const getInquiry = catchAsync(async (req, res) => {
    const inquiry = await inquiryService.getInquiryById(req.params.inquiryId);
    if (!inquiry) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Inquiry not found');
    }
    res.send(inquiry);
});
const updateInquiry = catchAsync(async (req, res) => {
    const inquiry = await inquiryService.updateInquiryById(req.params.inquiryId, req.body);
    res.send(inquiry);
});
const deleteInquiry = catchAsync(async (req, res) => {
    await inquiryService.deleteInquiryById(req.params.inquiryId);
    res.status(httpStatus.NO_CONTENT).send("Deleted");
});
export default {
    createInquiry,
    getInquiry,
    getInquiries,
    updateInquiry,
    deleteInquiry
};
