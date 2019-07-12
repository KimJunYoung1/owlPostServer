const USERINFO = require('../models/userinfo');

module.exports = (req, res) => {
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
};
