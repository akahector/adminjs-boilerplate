import httpStatus from 'http-status';
import prisma from '../client.js';
import ApiError from '../utils/ApiError.js';
import userService from './user.service.js';
const createInquiry = async (email, name, phone, message, product) => {
    const user = await userService.getUserByEmail(email);
    return prisma.inquiry.create({
        data: {
            email,
            product: product ? { connect: { id: product } } : undefined,
            name,
            phone,
            message,
            user: user ? { connect: { id: user.id } } : undefined
        }
    });
};
const queryInquiries = async (filter, options, keys = [
    'id',
    'name',
    'message',
    'userId',
    'phone',
    'createdAt',
    'updatedAt'
]) => {
    const page = options.page ?? 0;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const inquiries = await prisma.inquiry.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: page * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });
    return inquiries;
};
const getInquiryById = async (id, keys = [
    'id',
    'name',
    'message',
    'userId',
    'phone',
    'createdAt',
    'updatedAt'
]) => {
    return prisma.inquiry.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
};
const updateInquiryById = async (inquiryId, updateBody, keys = ['id', 'name',
    'message',
    'phone',]) => {
    const updatedInquiry = await prisma.inquiry.update({
        where: { id: inquiryId },
        data: updateBody,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
    return updatedInquiry;
};
const deleteInquiryById = async (inquiryId) => {
    const inquiry = await getInquiryById(inquiryId);
    if (!inquiry) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Inquiry not found');
    }
    await prisma.inquiry.delete({ where: { id: inquiry.id } });
    return inquiry;
};
export default {
    createInquiry,
    queryInquiries,
    getInquiryById,
    updateInquiryById,
    deleteInquiryById
};
