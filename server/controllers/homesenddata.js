const LETTERS = require('../models/letters');
const USERINFO = require('../models/userinfo');

module.exports = (req, res) => {
  USERINFO.findOne({ email: req.decode })
    .then(user => {
      LETTERS.find({ to: user.nickname })
        .then(letters => {
          res.status(200).json({ user, letters });
        })
        .catch(error => {
          res.status(400).json(`letterfinderror: ${error}`);
        });
    })
    .catch(error => {
      res.status(400).json(`userfinderror: ${error}`);
    });
};
