const USERINFO = require('../models/userinfo');
const jwt = require('../middleware/jwt');

module.exports = (req, res) => {
  const { email, password } = req.body;
  USERINFO.findOne({ email, password })
    .then(result => {
      const token = jwt.jwtsign(result.email);
      res.status(200).json({ token, nickname: result.nickname });
    }).catch(err => {
      res.status(400).json(err);
    });
};
