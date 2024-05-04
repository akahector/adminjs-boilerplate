import prisma from '../client.js';
const queryProducts = async (filter, options, keys = [
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
]) => {
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
    return products;
};
const getProductById = async (id, keys = [
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
]) => {
    return prisma.product.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
};
export default {
    queryProducts,
    getProductById,
};
