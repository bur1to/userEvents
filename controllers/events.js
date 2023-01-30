const Event = require('../models/event');
const { eventCreateValidation, eventUpdateValidation } = require('../validations/eventValidation');

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
  createEvent,
  updateEvent,
  deleteEvent
};
