const express = require('express');

const router = express.Router();

const mypage = require('../controllers/mypage');


router.get('/mypage', mypage);

module.exports = router;
