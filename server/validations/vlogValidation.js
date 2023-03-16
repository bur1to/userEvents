const Joi = require('joi');

const vlogCreateValidation = (data) => {
  const createValidation = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().min(10).required(),
    content: Joi.string().required(),
    themes: Joi.string().min(2).required(),
    date: Joi.date().required()
  });

  return createValidation.validateAsync(data);
};

const vlogUpdateValidation = (data) => {
  const updateValidation = Joi.object({
    title: Joi.string().min(10),
    content: Joi.string(),
    themes: Joi.string().min(2),
    date: Joi.date()
  });

  return updateValidation.validateAsync(data);
};

const vlogGetValidation = (data) => {
  const getValidation = Joi.object({
    page: Joi.number().default(0),
    limit: Joi.number().default(5),
    sort: Joi.string().allow().default('title'),
    sortBy: Joi.string().allow('asc', 'desc').default('asc')
  });

  return getValidation.validateAsync(data);
};

module.exports = {
  vlogCreateValidation,
  vlogUpdateValidation,
  vlogGetValidation
};
