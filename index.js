const express = require('express');
const mongoose = require('mongoose');
const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');
const {
  userRoute,
  eventRoute,
  loginRoute,
  commentRoute
} = require('./routes/index');
const blogRoute = require('./routes/blogRouter');

const swaggerDoc = YAML.load('./swagger/docs.yaml');

mongoose.set('strictQuery', true);
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/userEvents', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database successfully connected'))
  .catch((err) => console.log(err));

app.use('/users', userRoute);
app.use('/events', eventRoute);
app.use('/auth', loginRoute);
app.use('/blogs', blogRoute);
app.use('/comments', commentRoute);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(3000, () => {
  console.log('Server is running');
});
