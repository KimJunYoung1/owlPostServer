const LETTERS = require('../models/letters');

module.exports = (req, res) => {
  const letter = new LETTERS();
  letter.from = req.body.from;
  letter.to = req.body.to;
  letter.time = req.body.time;
  letter.messages = req.body.messages;

  letter.save(err => {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }

    res.json({ result: 1 });
  });
};
