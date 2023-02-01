const express = require('express');
const mongoose = require('mongoose');
const { userRoute, eventRoute } = require('./routes/index');

mongoose.set('strictQuery', true);
const app = express();

app.use(express.json());
app.use(express.urlencoded());

mongoose.connect('mongodb://localhost:27017/userEvents', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database successfully connected'))
  .catch((err) => console.log(err));

app.use('/users', userRoute);
app.use('/events', eventRoute);

app.listen(3000, () => {
  console.log('Server is running');
});
