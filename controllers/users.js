const User = require('../models/user');
const Event = require('../models/event');

const { userCreateValidation, userUpdateValidation, userGetValidation } = require('../validations/userValidation');

const getEvents = async (userId) => {
  const [nextEvent] = await Event.find({
    userId,
    startDate: { $gte: new Date() }
  })
    .sort({ startDate: 1 })
    .limit(1)
    .lean();

  const eventsCount = await Event.countDocuments({ userId });
  return {
    userId,
    nextEvent,
    eventsCount
  };
};

const getUsers = (async (req, res, next) => {
  try {
    const { query } = req;
    const {
      page,
      limit,
      sort,
      sortBy
    } = await userGetValidation(query);

    console.log(query);

    const sortOrder = sortBy === 'asc' ? 1 : -1;

    const count = await User.countDocuments();
    const users = await User.find({}, {
      firstName: 1,
      lastName: 1,
      email: 1,
      phoneNumber: 1,
      eventCount: 1,
      nextEventDate: 1
    }).sort({ [sort]: sortOrder })
      .skip(page * limit)
      .limit(limit)
      .lean();

    const tasks = users.map((user) => getEvents(user._id.toString()));

    const usersEventsResults = await Promise.all(tasks);

    const result = users.map((user) => {
      const userId = user._id.toString();
      const userEvents = usersEventsResults.find((item) => item.userId === userId);

      return {
        ...user,
        ...userEvents
      };
    });

    res.status(200).send({ users: result, count });
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
