const Joi = require('joi');

const eventCreateValidation = (data) => {
  const createValidation = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
  });

  return createValidation.validateAsync(data);
};

const eventGetValidation = (data) => {
  const getValidation = Joi.object({
    page: Joi.number().default(0),
    limit: Joi.number().default(5),
    sort: Joi.string().allow('title', 'description').default('title'),
    sortBy: Joi.string().allow('asc', 'desc').default('asc')
  });

  return getValidation.validateAsync(data);
};

const eventUpdateValidation = (data) => {
  const updateValidation = Joi.object({
    title: Joi.string().min(5).max(50),
    description: Joi.string().min(5),
    startDate: Joi.date(),
    endDate: Joi.date()
  });

  return updateValidation.validateAsync(data);
};

module.exports = {
  eventGetValidation,
  eventCreateValidation,
  eventUpdateValidation
};
