import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import pick from '../utils/pick.js';
import categoryService from '../service/category.service.js';
const getCategories = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await categoryService.queryCategories(filter, options);
    res.send(result);
});
const getCategory = catchAsync(async (req, res) => {
    const category = await categoryService.getCategoryById(req.params.categoryId);
    if (!category) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    }
    res.send(category);
});
const getSubCategories = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'categoryId']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await categoryService.querySubCategories(filter, options);
    res.send(result);
});
const getSubCategory = catchAsync(async (req, res) => {
    const subCategory = await categoryService.getSubCategoryById(req.params.subCategoryId);
    if (!subCategory) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Sub Category not found');
    }
    res.send(subCategory);
});
export default {
    getCategories,
    getCategory,
    getSubCategories,
    getSubCategory
};
