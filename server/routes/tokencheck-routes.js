const express = require('express');

const router = express.Router();

const mypage = require('../controllers/mypage');
const postbox = require('../controllers/postbox');
const cutmatch = require('../controllers/partner-cutmatch');
const match = require('../controllers/partner-match');
const blacklist = require('../controllers/blacklist');

router.get('/mypage', mypage);
router.get('/postbox', postbox);
router.put('/cutmatch', cutmatch);
router.post('/match', match);
router.post('/blacklist', blacklist);

module.exports = router;
