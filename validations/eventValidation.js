const Joi = require('joi');

const eventCreateValidation = (data) => {
  const createValidation = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
  });

  return createValidation.validateAsync(data);
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
  eventCreateValidation,
  eventUpdateValidation
};
