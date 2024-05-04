import Joi from 'joi';


const getCategories = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string()
  })
};

const getSubCategories = {
    query: Joi.object().keys({
      name: Joi.string(),
      category:Joi.string(),
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer()
    })
  };
  
  const getSubCategory = {
    params: Joi.object().keys({
      subCategoryId: Joi.string()
    })
  };


export default {
  getSubCategories,
  getSubCategory,
  getCategories,
  getCategory,
};