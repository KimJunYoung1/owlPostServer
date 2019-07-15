const express = require('express');

const router = express.Router();

const mypage = require('../controllers/mypage');
const postbox = require('../controllers/postbox');

router.get('/mypage', mypage);
router.get('/postbox', postbox);

module.exports = router;
