const express = require('express');

const router = express.Router();

const {
  getBlogs,
  userBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogs');

router.get('/', getBlogs);
router.get('/:id', getBlog);
router.get('/usrBlogs/:userId', userBlogs);

router.post('/', createBlog);

router.put('/:id', updateBlog);

router.delete('/:id', deleteBlog);

module.exports = router;
