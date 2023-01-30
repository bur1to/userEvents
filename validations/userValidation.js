const Joi = require('joi');

const userCreateValidation = (data) => {
  const createValidation = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).required()
  });

  return createValidation.validateAsync(data);
};

const userUpdateValidation = (data) => {
  const updateValidation = Joi.object({
    firstName: Joi.string().min(2).max(20),
    lastName: Joi.string().min(2).max(20),
    email: Joi.string().email(),
    phoneNumber: Joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
  });

  return updateValidation.validateAsync(data);
};

module.exports = {
  userCreateValidation,
  userUpdateValidation
};
