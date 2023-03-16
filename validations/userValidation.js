const Joi = require('joi');

const userGetValidation = (data) => {
  const getValidation = Joi.object({
    page: Joi.number().default(0),
    limit: Joi.number().default(5),
    sort: Joi.string().allow('firstName', 'lastName', 'email').default('firstName'),
    sortBy: Joi.string().allow('asc', 'desc').default('asc')
  });

  return getValidation.validateAsync(data);
};

const userCreateValidation = (data) => {
  const createValidation = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]{8,30}$/).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
  });

  return createValidation.validateAsync(data);
};

const userUpdateValidation = (data) => {
  const updateValidation = Joi.object({
    firstName: Joi.string().min(2).max(20),
    lastName: Joi.string().min(2).max(20),
    email: Joi.string().email(),
    phoneNumber: Joi.string().pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/),
    password: Joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]{8,30}$/),
    confirmPassword: Joi.ref('password')
  });

  return updateValidation.validateAsync(data);
};

module.exports = {
  userCreateValidation,
  userUpdateValidation,
  userGetValidation
};
