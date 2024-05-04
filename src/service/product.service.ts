import { Product } from '@prisma/client';
import prisma from '../client.js';


/**
 * Query for product
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async <Key extends keyof Product>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'weight',
    'gallery',
    'image',
    'name',
    'categoryId',
    'subCategoryId',
    'price',
    'description',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Product, Key>[]> => {
  const page = options.page ?? 0;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const products = await prisma.product.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return products as Pick<Product, Key>[];
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Product, Key> | null>}
 */
const getProductById = async <Key extends keyof Product>(
  id: string,
  keys: Key[] = [
    'id',
    'weight',
    'gallery',
    'image',
    'name',
    'categoryId',
    'subCategoryId',
    'price',
    'description',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Product, Key> | null> => {
    return prisma.product.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
      }) as any as Promise<Pick<Product, Key> | null>;
};

export default {
    queryProducts,
    getProductById,
};