const mongoose = require('mongoose');

const { Schema } = mongoose;

const userinfo = new Schema({
  email: String,
  password: String,
  nickname: String,
  age: Number,
  sex: Boolean,
  select: Boolean,
  blackList: [],
  partner_id: String,
});

module.exports = mongoose.model('userinfo', userinfo);
