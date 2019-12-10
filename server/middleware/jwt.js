const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.jwtsign = email => {
  const token = jwt.sign({ email }, process.env.PRIVATE_KEY, { expiresIn: '5h' });
  return token;
};

exports.jwtverify = (req, res, next) => {
  const token = req.headers['x-access-token'];
  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decode) => {
    if (err) {
      res.status(403).json(err);
    } else {
      req.decode = decode.email;
      next();
    }
  });
};
