const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  userId: { type: String },
  title: { type: String, minLength: 10 },
  themes: { type: String },
  content: { type: String },
  date: { type: Date }
}, {
  collection: 'blogs',
  versionKey: false
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
