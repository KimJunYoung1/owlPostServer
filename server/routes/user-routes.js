const express = require('express');

const router = express.Router();

const overlapcheck = require('../controllers/signup/overlap-check');
const signUp = require('../controllers/signup/signup');

const signin = require('../controllers/signin');

const sendletter = require('../controllers/sendletter');

router.get('/signup/overlapcheck', overlapcheck);
router.post('/signup', signUp);

router.post('/letter-send', sendletter);

router.get('/signin', signin);

module.exports = router;
