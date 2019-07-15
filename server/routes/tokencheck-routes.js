const express = require('express');

const router = express.Router();

const mypage = require('../controllers/mypage');
const postbox = require('../controllers/postbox');
const cutmatch = require('../controllers/partner-cutmatch');
const match = require('../controllers/partner-match');

router.get('/mypage', mypage);
router.get('/postbox', postbox);
router.put('/cutmatch', cutmatch);
router.post('/match', match);

module.exports = router;
