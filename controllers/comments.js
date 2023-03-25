const Comment = require('../models/comment');
const { createCommentValidation, updateCommentValidation } = require('../validations/commentValidation');

const getComments = (async (req, res, next) => {
    try {
      const { blogId } = req.params;
      const comments = await Comment.find({ blogId });

      res.send(comments);
    } catch (err) {
      next(err);
    }
});

const userComments = (async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userComment = await Comment.find({ userId }, {
      comment: 1
    });

    const count = await Comment.countDocuments({ userId });

    const result = {
      userComment,
      count
    };

    res.send(result);
  } catch (err) {
    next(err);
  }
});

const createComment = (async (req, res, next) => {
  try {
    const { body } = req;

    if (!body) {
      throw new Error('Body is required');
    }

    const createParams = await createCommentValidation(body);

    const newComment = await Comment.create(createParams);

    res.send(newComment);
  } catch (err) {
    next(err);
  }
});

const updateComment = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    if (!body) {
      throw new Error('Body is required');
    }

    const updateParams = await updateCommentValidation(body);

    const updatedComment = await Comment.findByIdAndUpdate(id, updateParams, { new: true });

    res.send(updatedComment);
  } catch (err) {
    next(err);
  }
});

const deleteComment = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Comment.deleteOne({ _id: id });

    res.send(deleted);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  getComments,
  userComments,
  createComment,
  updateComment,
  deleteComment
}
