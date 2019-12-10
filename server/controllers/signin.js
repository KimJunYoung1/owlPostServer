const crypto = require('crypto');
const USERINFO = require('../models/userinfo');
const jwt = require('../middleware/jwt');

module.exports = async (req, res) => {
  const { email, password } = req.headers;
  const shasum = crypto
    .createHash('sha512')
    .update(`${password}i love coffee`)
    .digest('base64');

  // crypto.randomBytes(64, (err, buf) => {
  //   crypto.pbkdf2(shasum, buf.toString('base64'), 126587, 64, 'sha512', (_err, key) => {
  //     console.log(key.toString('base64'));
  //   });
  // });
  // crypto salt 구현방식을 정확히 모르겠음

  try {
    const result = await USERINFO.findOne({ email, password: shasum });
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
