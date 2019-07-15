const express = require('express');

const router = express.Router();

const mypage = require('../controllers/mypage');
const postbox = require('../controllers/postbox');
const cutmatch = require('../controllers/partner-cutmatch');

router.get('/mypage', mypage);
router.get('/postbox', postbox);
router.put('/cutmatch', cutmatch);

module.exports = router;
