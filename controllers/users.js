const User = require('../models/user');
const { userCreateValidation, userUpdateValidation } = require('../validations/userValidation');

const getUsers = (async (req, res, next) => {
  try {
    const data = await User.find({}, {
      firstName: 1,
      lastName: 1,
      phoneNumber: 1
    });

    res.send(data);
  } catch (err) {
    next(err);
  }
});

const getUser = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await User.findOne({ _id: id });

    res.send(data);
  } catch (err) {
    next(err);
  }
});

const createUser = (async (req, res, next) => {
  try {
    const { body } = req;

    if (!body) {
      throw new Error('Body required');
    }

    const createParams = await userCreateValidation(body);
    const newUser = await User.create(createParams);

    res.send(newUser);
  } catch (err) {
    next(err);
  }
});

const updateUser = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updateParams = await userUpdateValidation(body);

    const updated = await User.findByIdAndUpdate(id, updateParams, { nw: true });

    res.send(updated);
  } catch (err) {
    next(err);
  }
});

const deleteUser = (async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await User.deleteOne({ _id: id });

    res.send(deleted);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
