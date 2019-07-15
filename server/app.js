const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./models/connection');

const app = express();
const userRoutes = require('./routes/user-routes');
const tokencheckRoutes = require('./routes/tokencheck-routes');
const jwt = require('./middleware/jwt');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

connectDB();

app.use('/user', userRoutes);

app.use('/', jwt.jwtverify);

app.use('/check', tokencheckRoutes);

app.get('/', (req, res) => {
  res.send('보내지나여 :3');
});

app.listen(5000, () => {
  // eslint-disable-next-line no-console
  console.log('sucess!');
});
