const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDB = require('./models/connection');

const app = express();


/*


*/

const port = 8080;
const signUp = require('./controllers/signup');
const signin = require('./controllers/signin');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

connectDB();


app.get('/', (req, res) => {
  res.send('보내지나여 :3');
});

app.get('/user/signin', signin);
app.post('/user/signup', signUp);

app.listen(port, () => {
  console.log('sucess!');
});
