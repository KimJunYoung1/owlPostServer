const express = require('express');
const userinfo = require('../models/userinfo');

const router = express.Router();

router.post('/', () => {
  userinfo
    .create({
      email: 'hyuseo@naver.com',
      password: 'pass3word5Pass7word',
      nickname: 'ironman',
      age: 20,
      sex: 'Boolean',
      select: 'Boolean',
      blackList: [],
      partner_id: 'partnerEmail@naver.com',
    })
    .then(result => {
      console.log('---------->', result);
    });
});


module.exports = router;
