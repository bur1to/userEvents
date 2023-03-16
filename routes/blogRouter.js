const express = require('express');

const router = express.Router();

const {
  getBlogs,
  getUserBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogs');

router.get('/', getBlogs);
router.get('/:userId', getUserBlogs);
router.get('/:id', getBlog);

router.post('/', createBlog);

router.put('/:id', updateBlog);

router.delete('/:id', deleteBlog);

module.exports = router;
