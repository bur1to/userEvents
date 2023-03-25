const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {
  userRoute,
  eventRoute,
  loginRoute,
  commentRoute
} = require('./routes/index');
const blogRoute = require('./routes/blogRouter');

mongoose.set('strictQuery', true);
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/userEvents', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database successfully connected'))
  .catch((err) => console.log(err));

app.use('/users', userRoute);
app.use('/events', eventRoute);
app.use('/auth', loginRoute);
app.use('/blogs', blogRoute);
app.use('/comments', commentRoute);

app.listen(3000, () => {
  console.log('Server is running');
});
