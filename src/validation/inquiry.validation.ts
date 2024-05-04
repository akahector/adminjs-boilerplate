
import Joi from 'joi';

const createInquiry = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      phone: Joi.string().required(),
      name: Joi.string().required(),
      product: Joi.string().required(),
      message:Joi.string(),
    })
  };


const getAllIquiries = {
  query: Joi.object().keys({
    name: Joi.string(),
    email:Joi.string().email(),
    phone:Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getInquiry = {
  params: Joi.object().keys({
    inquiryId: Joi.string()
  })
};
const updateInquiry = {
    params: Joi.object().keys({
      inquiryId: Joi.string().required()
    }),
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        phone: Joi.string().required(),
        name: Joi.string().required(),
        product: Joi.string().required(),
        message:Joi.string(),
      })
      .min(1)
  };
  
  const deleteInquiry = {
    params: Joi.object().keys({
        inquiryId: Joi.string().required()
    })
  };


export default {
    updateInquiry,
    createInquiry,
    getAllIquiries,
    getInquiry,
    deleteInquiry
};
