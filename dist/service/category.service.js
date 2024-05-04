import prisma from '../client.js';
const queryCategories = async (filter, options, keys = [
    'id',
    'icon',
    'name',
    'createdAt',
    'updatedAt'
]) => {
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
    return categories;
};
const getCategoryById = async (id, keys = [
    'id',
    'icon',
    'name',
    'createdAt',
    'updatedAt'
]) => {
    return prisma.category.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
};
const querySubCategories = async (filter, options, keys = [
    'id',
    'icon',
    'name',
    'categoryId',
    'createdAt',
    'updatedAt'
]) => {
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
    return subCategories;
};
const getSubCategoryById = async (id, keys = [
    'id',
    'icon',
    'name',
    'categoryId',
    'createdAt',
    'updatedAt'
]) => {
    return prisma.subCategory.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
};
export default {
    queryCategories,
    getCategoryById,
    querySubCategories,
    getSubCategoryById
};
