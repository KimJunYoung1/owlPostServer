const USERINFO = require('../../models/userinfo');

module.exports = (req, res) => {
  USERINFO.findOne({ email: req.decode })
    .then(result => {
      if (result === null) {
        res.status(404).json('존재하지 않는 유저 정보입니다.');
      } else {
        USERINFO.deleteOne(result)
          .then(() => {
            res.status(204).json('성공적으로 유저 정보를 삭제했습니다.');
          })
          .catch(error => {
            res.status(400).json(`deleteError: ${error}`);
          });
      }
    })
    .catch(err => {
      res.status(400).json(err);
    });
};
