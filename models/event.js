const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: { type: String, minLength: 5, maxLength: 50 },
  description: { type: String, minLength: 5 },
  startDate: { type: Date },
  endDate: { type: Date }
}, {
  collection: 'events',
  versionKey: false
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
