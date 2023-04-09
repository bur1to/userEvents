const Blog = require('../models/blog');
const { blogCreateValidation, blogUpdateValidation, blogGetValidation } = require('../validations/blogValidation');

const getBlogs = (async (req, res, next) => {
  try {
    const { query } = req;
    const {
      page,
      limit,
      sort,
      sortBy
    } = await blogGetValidation(query);

    const sortOrder = sortBy === 'asc' ? 1 : -1;

    const count = await Blog.countDocuments();
    const blogs = await Blog.find({}, {
      title: 1,
      themes: 1,
      content: 1,
      date: 1
    }).sort({ [sort]: sortOrder })
      .skip(page * limit)
      .limit(limit)
      .lean();

    const result = {
      blogs,
      count
    };

    res.send(result);
  } catch (err) {
    next(err);
  }
});

const userBlogs = (async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { query } = req;
    const {
      page,
      limit,
      sort,
      sortBy
    } = await blogGetValidation(query);

    const sortOrder = sortBy === 'asc' ? 1 : -1;

    const userBlogs = await Blog.find({ userId }, {
      title: 1,
      themes: 1,
      content: 1,
      date: 1
    }).sort({ [sort]: sortOrder })
      .skip(page * limit)
      .limit(limit)
      .lean();

    const count = await Blog.countDocuments({ userId });

    const result = {
      userBlogs,
      count
    };

    res.send(result);
  } catch (err) {
    next(err);
  }
});

const getBlog = (async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findOne({ _id: id });

    res.send(blog);
  } catch (err) {
    next(err);
  }
});

const createBlog = (async (req, res, next) => {
  try {
    const { body } = req;

    const createParams = await blogCreateValidation(body);

    const newBlog = await Blog.create(createParams);

    res.send(newBlog);
  } catch (err) {
    next(err);
  }
});

const updateBlog = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updateParams = await blogUpdateValidation(body);

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateParams, { new: true });

    res.send(updatedBlog);
  } catch (err) {
    next(err);
  }
});

const deleteBlog = (async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.deleteOne({ _id: id });

    res.send(deletedBlog);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  getBlogs,
  userBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
};
