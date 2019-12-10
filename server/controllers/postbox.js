const LETTERS = require('../models/letters');
const USERINFO = require('../models/userinfo');

module.exports = async (req, res) => {
  // eslint-disable-next-line camelcase

  const userinfos = await USERINFO.findOne({ email: req.decode });
  // eslint-disable-next-line camelcase

  if (req.decode === userinfos.email) {
    const data = await LETTERS.find({ to: userinfos.nickname });

    const obj = {};
    obj.nickname = userinfos.nickname;
    obj.toData = data;
    console.log(obj);
    res.status(200).json(obj);
  } else {
    res.status(400).json('partner가 존재하지 않습니다');
  }
};
