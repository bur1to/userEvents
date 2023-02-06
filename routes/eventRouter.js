const express = require('express');

const router = express.Router();

const {
  getUserEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/events');

router.get('/:userId', getUserEvents);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;
