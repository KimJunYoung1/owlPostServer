const LETTERS = require('../models/letters');
const USERINFO = require('../models/userinfo');

module.exports = async (req, res) => {
  USERINFO.findOne({ email: req.decode })
    .then(user => {
      if (user.partner_nickname !== null) {
        LETTERS.find({ to: user.nickname, from: user.partner_nickname })
          .then(letters => {
            res.status(200).json({ user, letters });
          })
          .catch(error => {
            res.status(400).json(`letterfinderror: ${error}`);
          });
      } else if (user.partner_nickname === null) {
        res.status(200).json({ user });
      }
    })
    .catch(error => {
      res.status(400).json(`userfinderror: ${error}`);
    });
};
