const express = require('express');

const router = express.Router();

const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  userComments
} = require('../controllers/comments');

router.get('/:blogId', getComments);
router.get('/:userId', userComments);

router.post('/', createComment);

router.put('/:id', updateComment);

router.delete('/:id', deleteComment);

module.exports = router;
