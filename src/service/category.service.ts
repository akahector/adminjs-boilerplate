import { Category, SubCategory } from '@prisma/client';
import prisma from '../client.js';


/**
 * Query for users
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCategories = async <Key extends keyof Category>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'icon',
    'name',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Category, Key>[]> => {
  const page = options.page ?? 0;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? 'desc';
  const categories = await prisma.category.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: page * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined
  });
  return categories as Pick<Category, Key>[];
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Category, Key> | null>}
 */
const getCategoryById = async <Key extends keyof Category>(
  id: string,
  keys: Key[] = [
    'id',
    'icon',
    'name',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Category, Key> | null> => {
    return prisma.category.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
      }) as any as Promise<Pick<Category, Key> | null>;
};


/**
 * Query for subCategories
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySubCategories = async <Key extends keyof SubCategory>(
    filter: object,
    options: {
      limit?: number;
      page?: number;
      sortBy?: string;
      sortType?: 'asc' | 'desc';
    },
    keys: Key[] = [
      'id',
      'icon',
      'name',
      'categoryId',
      'createdAt',
      'updatedAt'
    ] as Key[]
  ): Promise<Pick<SubCategory, Key>[]> => {
    const page = options.page ?? 0;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const subCategories = await prisma.subCategory.findMany({
      where: filter,
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      skip: page * limit,
      take: limit,
      orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });
    return subCategories as Pick<SubCategory, Key>[];
  };
  
  /**
   * Get subCategory by id
   * @param {ObjectId} id
   * @param {Array<Key>} keys
   * @returns {Promise<Pick<SubCategory, Key> | null>}
   */
  const getSubCategoryById = async <Key extends keyof SubCategory>(
    id: string,
    keys: Key[] = [
      'id',
      'icon',
      'name',
      'categoryId',
      'createdAt',
      'updatedAt'
    ] as Key[]
  ): Promise<Pick<SubCategory, Key> | null> => {
      return prisma.subCategory.findUnique({
          where: { id },
          select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
        }) as any as Promise<Pick<SubCategory, Key> | null>;
  };
  



export default {
    queryCategories,
    getCategoryById,
    querySubCategories,
    getSubCategoryById
};