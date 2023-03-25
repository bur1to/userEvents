const Joi = require('joi');

const createCommentValidation = (data) => {
  const createValidation = Joi.object({
    userId: Joi.string().required(),
    blogId: Joi.string().required(),
    comment: Joi.string().required(),
    author: Joi.string()
  });

  return createValidation.validateAsync(data);
};

const updateCommentValidation = (data) => {
  const updateValidation = Joi.object({
    comment: Joi.string()
  });

  return updateValidation.validateAsync(data);
};

module.exports = {
    createCommentValidation,
    updateCommentValidation
}
