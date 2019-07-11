// 1. express install
// 2. nodemon
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('보내지나여 :3');
});

app.listen(port, () => {
  console.log('sucess!');
});
