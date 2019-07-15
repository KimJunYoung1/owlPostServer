const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./models/connection');

const app = express();
const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

connectDB();

app.use('/user', routes);

app.get('/', (req, res) => {
  res.send('보내지나여 :3');
});

app.listen(5000, () => {
  console.log('sucess!');
});
