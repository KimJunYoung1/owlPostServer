const mongoose = require('mongoose');

const { Schema } = mongoose;

const userinfo = new Schema(
  {
    email: String,
    password: String,
    nickname: String,
    age: Number,
    sex: Boolean,
    select: Boolean,
    blackList: [{ type: String }],
    partner_nickname: String,
    letterSendtime: String,
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('userinfo', userinfo);
