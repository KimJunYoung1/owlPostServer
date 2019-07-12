const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.jwtsign = email => {
  // process.env.secret
  console.log(process.env.PRIVATE_KEY);
  const token = jwt.sign({ email }, `${process.env.PRIVATE_KEY}`, { expiresIn: '1m' });
  return token;
};
