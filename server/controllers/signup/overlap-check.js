const USERINFO = require('../../models/userinfo');

// email, nickname  중복 체크
module.exports = (req, res) => {
  const reqKey = Object.keys(req.query)[0];
  USERINFO.findOne(req.query)
    .then(result => {
      if (result !== null) {
        res.status(400).json(`중복된 ${reqKey}입니다.`);
      } else if (result === null) {
        res.status(200).json(`사용 가능한 ${reqKey}입니다.`);
      }
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
