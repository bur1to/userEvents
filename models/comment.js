const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  userId: { type: String },
  blogId: { type: String },
  comment: { type: String },
  author: { type: String }
}, {
    collection: 'comments',
    versionKey: false
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
