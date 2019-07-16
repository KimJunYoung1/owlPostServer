const express = require('express');

const router = express.Router();

const mypage = require('../controllers/mypage');
const postbox = require('../controllers/postbox');
const cutmatch = require('../controllers/partner/partner-cutmatch');
const match = require('../controllers/partner/partner-match');
const blacklist = require('../controllers/blacklist');
const withdrawal = require('../controllers/delete/withdrawal');

router.get('/mypage', mypage);
router.get('/postbox', postbox);

router.post('/match', match);
router.post('/blacklist', blacklist);

router.put('/cutmatch', cutmatch);

router.delete('/withdrawal', withdrawal);

module.exports = router;
