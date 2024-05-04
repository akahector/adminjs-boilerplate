import Joi from 'joi';
const getProducts = {
    query: Joi.object().keys({
        name: Joi.string(),
        categoryId: Joi.string(),
        subCategoryId: Joi.string(),
        price: Joi.string(),
        weight: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
};
const getProduct = {
    params: Joi.object().keys({
        productId: Joi.string()
    })
};
export default {
    getProducts,
    getProduct,
};
