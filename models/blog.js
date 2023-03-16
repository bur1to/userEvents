const mongoose = require('mongoose');

const vlogSchema = mongoose.Schema({
  userId: { type: String },
  title: { type: String, minLength: 10 },
  themes: { type: String },
  content: { type: String },
  date: { type: Date }
}, {
  collection: 'vlogs',
  versionKey: false
});

const Blog = mongoose.model('Blog', vlogSchema);

module.exports = Blog;
