const LETTERS = require('../models/letters');
const USERINFO = require('../models/userinfo');

module.exports = (req, res) => {
  const { from, to } = req.body;
  if (to !== null) {
    USERINFO.findOne({ nickname: from, partner_nickName: to })
      .then(() => {
        LETTERS.collection.insertOne(req.body);
        res.status(201).json({ result: 1 });
      }).catch(err => {
        res.status(400).json(err);
      });
  } else {
    res.status(400).json('partner matching전 입니다.');
  }
};
