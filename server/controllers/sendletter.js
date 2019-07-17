const LETTERS = require('../models/letters');
const USERINFO = require('../models/userinfo');

module.exports = async (req, res) => {
  const { to } = req.body;
  if (to !== null) {
    USERINFO.findOne({ nickname: req.decode, partner_nickName: to })
      .then(() => {
        LETTERS.collection.insertOne(req.body);
        res.status(201).json('성공적으로 편지를 전달하였습니다.');
      })
      .catch(err => {
        res.status(400).json(err);
      });
  } else {
    res.status(400).json('partner matching전 입니다.');
  }
};
