const LETTERS = require('../models/letters');

module.exports = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { email, nickname } = req.query;
  // eslint-disable-next-line camelcase
  console.log(req.decode);
  if (req.decode === email) {
    const data = await LETTERS.find({ to: nickname });
    const data2 = await LETTERS.find({ from: nickname });

    const obj = {};
    obj.nickname = nickname;
    obj.toData = data;
    obj.fromData = data2;


    res.status(200).json(obj);
  } else {
    res.status(400).json('partner가 존재하지 않습니다');
  }
};
