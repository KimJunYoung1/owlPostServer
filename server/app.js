
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./models/connection');
const USERINFO = require('./models/userinfo');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

connectDB();

app.get('/', (req, res) => {
  res.send('보내지나여 :3');
});

app.post('/user/signup', (req, res) => {
  console.log(req.body);

  const userinfo = new USERINFO();
  userinfo.email = req.body.email;
  userinfo.password = req.body.password;
  userinfo.nickname = req.body.nickname;
  userinfo.age = req.body.age;
  userinfo.sex = req.body.sex;
  userinfo.select = req.body.select;
  userinfo.blackList = req.body.blackList;
  userinfo.partner_id = req.body.partner_id;

  userinfo.save(err => {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }

    res.json({ result: 1 });
  });
});


app.listen(port, () => {
  console.log('sucess!');
});
