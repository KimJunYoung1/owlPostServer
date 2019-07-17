const USERINFO = require('../models/userinfo');
const jwt = require('../middleware/jwt');

module.exports = async (req, res) => {
  const { email, password } = req.headers;
  try {
    const result = await USERINFO.findOne({ email, password });
    if (result === null) {
      res.status(400).json('owlpost에 없는 유저입니다. 이메일이나 비밀번호를 확인해주세요.');
    } else if (result !== null) {
      const token = jwt.jwtsign(result.email);
      res.status(200).json({ token, result });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
