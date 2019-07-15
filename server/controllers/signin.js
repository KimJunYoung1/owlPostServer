const USERINFO = require('../models/userinfo');
const jwt = require('../middleware/jwt');

module.exports = (req, res) => {
  console.log(req);
  const { email, password } = req.query;
  USERINFO.findOne({ email, password })
    .then(result => {
      const token = jwt.jwtsign(result.email);
      res.status(200).json({ token, result }); // client test용
      // res.status(200).json({ token, nickname: result.nickname });
    }).catch(err => {
      res.status(400).json(err);
    });
};
