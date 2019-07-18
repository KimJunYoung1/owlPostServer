const crypto = require('crypto');
const USERINFO = require('../../models/userinfo');

module.exports = (req, res) => {
  // console.log(req.body);
  const { email } = req.body;
  if (req.body.partner_nickname === null) {
    USERINFO.findOne({ email })
      .then(result => {
        if (result === null) {
          const shasum = crypto
            .createHash('sha512')
            .update(`${req.body.password}i love coffee`)
            .digest('base64');

          // crypto.randomBytes(64, (err, buf) => {
          //   crypto.pbkdf2(shasum, buf.toString('base64'), 126587, 64, 'sha512', (_err, key) => {
          //     console.log(key.toString('base64'));
          //   });
          // });

          USERINFO.collection.insertOne({
            email: req.body.email,
            password: shasum,
            nickname: req.body.nickname,
            age: req.body.age,
            sex: req.body.sex,
            select: req.body.select,
            blackList: req.body.blackList,
            partner_nickname: req.body.partner_nickname,
            letterSendtime: req.body.letterSendtime,
          });
          res.status(201).json('회원가입 되었습니다.');
        } else {
          res.status(400).json('이미 등록된 계정입니다.');
        }
      })
      .catch(err => {
        res.status(400).json(err);
      });
  } else {
    res.status(400).json('형식에 맞지 않는 userInfo 입니다.');
  }
};
