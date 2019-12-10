const USERINFO = require('../models/userinfo');

module.exports = (req, res) => {
  USERINFO.findOne({ email: req.decode })
    .then(result => {
      if (result.partner_nickname === null) {
        res.status(403).json('matching된 partner가 없습니다.');
      } else if (result.partner_nickname !== null) {
        USERINFO.update(result, { partner_nickname: null }, (error, update) => {
          if (error) {
            res.status(400).json(error);
          }
          res.status(200).json(`partner ${update}와의 관계가 성공적으로 끊겼습니다.`);
        });
      }
    }).catch(error => {
      res.status(400).json(error);
    });
};
