const Vlog = require('../models/blog');
const { vlogCreateValidation, vlogUpdateValidation, vlogGetValidation } = require('../validations/vlogValidation');

const getVlogs = (async (req, res, next) => {
  try {
    const { query } = req;
    const {
      page,
      limit,
      sort,
      sortBy
    } = await vlogGetValidation(query);

    const sortOrder = sortBy === 'asc' ? 1 : -1;

    const count = await Vlog.countDocuments();
    const blogs = await Vlog.find({}, {
      title: 1,
      content: 1,
      date: 1
    }).sort({ [sort]: sortOrder })
      .skip(page * limit)
      .limit(limit)
      .lean();

    const result = {
      blogs,
      count
    };

    res.send(result);
  } catch (err) {
    next(err);
  }
});

const getVlog = (async (req, res, next) => {
  try {
    const { userId } = req.params;

    const count = await Vlog.countDocuments({ userId });
    const blog = await Vlog.findOne({ userId });

    const result = {
      blog,
      count
    };

    res.send(result);
  } catch (err) {
    next(err);
  }
});

const createVlog = (async (req, res, next) => {
  try {
    const { body } = req;

    const createParams = await vlogCreateValidation(body);

    const newVlog = await Vlog.create(createParams);

    res.send(newVlog);
  } catch (err) {
    next(err);
  }
});

const updateVlog = (async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const updateParams = await vlogUpdateValidation(body);

    const updatedVlog = await Vlog.findByIdAndUpdate(id, updateParams, { new: true });

    res.send(updatedVlog);
  } catch (err) {
    next(err);
  }
});

const deleteVlog = (async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedVlog = await Vlog.deleteOne({ _id: id });

    res.send(deletedVlog);
  } catch (err) {
    next(err);
  }
});

module.exports = {
  getVlogs,
  getVlog,
  createVlog,
  updateVlog,
  deleteVlog
};
