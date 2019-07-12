
const USERINFO = require('../models/userinfo');
const jwt = require('../middleware/jwt');

module.exports = (req, res) => {
  const { email } = req.body;
  USERINFO.findOne({ email }, (err, userinfo) => {
    if (!userinfo.email) {
      res.json(err);
    } else {
      console.log(userinfo);
      const token = jwt.jwtsign(email);
      res.json(token);
    }
  });
};
