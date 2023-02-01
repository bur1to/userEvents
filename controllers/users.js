const User = require('../models/user');
const { userCreateValidation, userUpdateValidation } = require('../validations/userValidation');

const getUsers = (async (req, res, next) => {
  try {
    let { page, limit } = req.query;

    if (!page) {
      page = 0;
    }

    if (!limit) {
      limit = 5;
    }

    // const userCount = await User.countDocuments();

    const data = await User.find({}, {
      firstName: 1,
      lastName: 1,
      email: 1,
      phoneNumber: 1
    }).sort({ firstName: 1 })
      .skip(page * limit)
      .limit(limit);

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
});

const getUser = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await User.findOne({ _id: id });

    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
});

const createUser = (async (req, res, next) => {
  try {
    const { body } = req;

    const createParams = await userCreateValidation(body);
    const newUser = await User.create(createParams);

    res.status(200).send(newUser);
  } catch (err) {
    next(err);
  }
});

const updateUser = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updateParams = await userUpdateValidation(body);

    const updated = await User.findByIdAndUpdate(id, updateParams, { new: true });

    res.status(200).send(updated);
  } catch (err) {
    next(err);
  }
});

const deleteUser = (async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await User.deleteOne({ _id: id });

    res.status(200).send(deleted);
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
