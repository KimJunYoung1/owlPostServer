const USERINFO = require('../models/userinfo');

module.exports = (req, res) => {
  // console.log(req.body);
  const { email } = req.body;
  if (req.body.partner_nickname === null) {
    USERINFO.findOne({ email })
      .then(result => {
        if (result === null) {
          USERINFO.collection.insertOne(req.body);
          res.status(201).json();
        } else {
          res.status(400).json('이미 등록된 계정입니다.');
        }
      }).catch(err => {
        res.status(400).json(err);
      });
  }
};
