const LETTERS = require('../../models/letters');
const USERINFO = require('../../models/userinfo');

module.exports = (req, res) => {
  const deleteLetter = mesEl => {
    USERINFO.findOne({ email: req.decode })
      .then(result => {
        const { nickname } = result;
        LETTERS.findOne({ to: nickname, messages: mesEl.messages })
          .then(letterResult => {
            if (letterResult !== null) {
              LETTERS.deleteOne(letterResult)
                .then(() => {
                  res.status(200).json('선택한 편지를 삭제하였습니다.');
                })
                .catch(error => {
                  res.status(400).json(`letterDeleteError: ${error}`);
                });
            } else if (letterResult === null) {
              res.status(403).json('해당 편지를 찾을 수 없습니다.');
            }
          })
          .catch(error => {
            res.status(400).json(`letterError: ${error}`);
          });
      })
      .catch(err => {
        res.status(400).json(`userFindError: ${err}`);
      });
  };
  if (req.body.selectmessage.length > 1) {
    // eslint-disable-next-line no-plusplus
    for (let messageEl = 0; messageEl < req.body.selectmessage.length; messageEl++) {
      deleteLetter(req.body.selectmessage[messageEl]);
    }
  } else if (req.body.selectmessage.length === 1) {
    deleteLetter(req.body.selectmessage[0]);
  }
};
