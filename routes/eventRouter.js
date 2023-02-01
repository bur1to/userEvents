const express = require('express');

const router = express.Router();

const {
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/events');

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;
