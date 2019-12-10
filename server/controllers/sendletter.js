const LETTERS = require('../models/letters');
const USERINFO = require('../models/userinfo');

module.exports = async (req, res) => {
  try {
    const { to } = req.body;
    if (to !== null) {
      const result = await USERINFO.findOne({ email: req.decode, partner_nickname: to });
      if (result !== null) {
        await LETTERS.collection.insertOne(req.body);
        await USERINFO.updateOne(result, { letterSendtime: req.headers.currtime });
      }
      res.status(201).json('부엉이가 출발했습니다!');
    } else {
      res.status(400).json('partner matching전 입니다.');
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
