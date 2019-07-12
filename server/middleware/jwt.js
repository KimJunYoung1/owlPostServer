const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.jwtsign = email => {
  // process.env.secret
  console.log(process.env.secret);
  const token = jwt.sign({ email }, process.env.secret, { expiresIn: '1m' });
  return token;
};
