const crypto = require('crypto');
const User = require('../models/user');

const login = (async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.findOne({ email: body.email });

    if (!user) {
      throw new Error('Incorrect email or password');
    }

    const { salt } = user;
    const hashedPassword = crypto.pbkdf2Sync(body.password, salt, 1000, 64, 'sha512').tiString('hex');

    if (user.password !== hashedPassword) {
      throw new Error('Incorrect email or password');
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  login
};
