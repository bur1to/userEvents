const Event = require('../models/event');
const { eventCreateValidation, eventUpdateValidation, eventGetValidation } = require('../validations/eventValidation');

const getUserEvents = (async (req, res, next) => {
  try {
    const { query } = req;
    const {
      page,
      limit,
      sort,
      sortBy
    } = await eventGetValidation(query);

    const sortOrder = sortBy === 'asc' ? 1 : -1;

    const { userId } = req.params;
    const data = await Event.find({ userId }, {
      title: 1,
      description: 1,
      startDate: 1,
      endDate: 1
    }).sort({ [sort]: sortOrder })
      .skip(page * limit)
      .limit(limit)
      .lean();

    const count = Event.countDocuments({ userId });

    const result = JSON.stringify(data, count);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
});

const createEvent = (async (req, res, next) => {
  try {
    const { body } = req;

    const createParams = await eventCreateValidation(body);
    const created = await Event.create(createParams);

    res.status(200).send(created);
  } catch (err) {
    next(err);
  }
});

const updateEvent = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req.body;

    const updateParams = await eventUpdateValidation(body);
    const updated = await Event.findByIdAndUpdate(id, updateParams, { new: true });

    res.status(200).send(updated);
  } catch (err) {
    next(err);
  }
});

const deleteEvent = (async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await Event.deleteOne({ _id: id });

    res.status(200).send(deleted);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  getUserEvents,
  createEvent,
  updateEvent,
  deleteEvent
};
