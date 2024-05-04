import { Inquiry, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client.js';
import ApiError from '../utils/ApiError.js';
import userService from './user.service.js';

/**
 * Create a inquiry
 * @param {Object} inquiryBody
 * @returns {Promise<Inquiry>}
 */
const createInquiry = async (
  email:string,
  name: string,
  phone:string,
  message?:string,
  product?:string,
): Promise<Inquiry> => {
  const user = await userService.getUserByEmail(email)

  return prisma.inquiry.create({
    data: {
      email,
      product: product ? {connect:{id: product}}:undefined,
      name,
      phone,
      message,
      user: user ? { connect: { id: user.id } } : undefined
    }
  });
};

/**
 * Query for inquiry
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryInquiries = async <Key extends keyof Inquiry>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'name',
    'message',
    'userId',
    'phone',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Inquiry, Key>[]> => {
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
  return inquiries as Pick<Inquiry, Key>[];
};

/**
 * Get inquiry by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Inquiry, Key> | null>}
 */
const getInquiryById = async <Key extends keyof Inquiry>(
  id: string,
  keys: Key[] = [
    'id',
    'name',
    'message',
    'userId',
    'phone',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Inquiry, Key> | null> => {
    return prisma.inquiry.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
      }) as any as Promise<Pick<Inquiry, Key> | null>;
};

/**
 * Update inquiry by id
 * @param {ObjectId} inquiryId
 * @param {Object} updateBody
 * @returns {Promise<Inquiry>}
 */
const updateInquiryById = async <Key extends keyof Inquiry>(
  inquiryId: string,
  updateBody: Prisma.InquiryUpdateInput,
  keys: Key[] = ['id', 'name',
  'message',
  'phone',] as Key[]
): Promise<Pick<Inquiry, Key> | null> => {

  const updatedInquiry = await prisma.inquiry.update({
    where: { id: inquiryId },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedInquiry as Pick<Inquiry, Key> | null;
};

/**
 * Delete inquiry by id
 * @param {ObjectId} inquiryId
 * @returns {Promise<Inquiry>}
 */
const deleteInquiryById = async (inquiryId: string): Promise<Inquiry> => {
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