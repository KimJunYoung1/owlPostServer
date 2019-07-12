const jwt = require('jsonwebtoken');
const PRIVATE_KEY = require('../../config/env');

exports.jwtsign = email => {
  console.log(PRIVATE_KEY);
  const token = jwt.sign({ email }, PRIVATE_KEY, { expiresIn: '1m' });
  return token;
};
