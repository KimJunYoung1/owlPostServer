const express = require('express');

const router = express.Router();

const signUp = require('./controllers/signup');
const signin = require('./controllers/signin');
const sendletter = require('./controllers/sendletter');

router.post('/signup', signUp);

router.post('/letter-send', sendletter);

router.get('/signin', signin);

module.exports = router;
