const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstName: { type: String, minLength: 2, maxLength: 20 },
  lastName: { type: String, minLength: 2, maxLength: 20 },
  email: { type: String, unique: true },
  phoneNumber: { type: String }
}, {
  collection: 'users',
  versionKey: false
});

const User = mongoose.model('User', userSchema);

module.exports = User;
