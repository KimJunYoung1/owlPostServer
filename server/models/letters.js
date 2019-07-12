const mongoose = require('mongoose');

const { Schema } = mongoose;

const letters = new Schema(
  {
    from: String,
    to: String,
    time: String /* typeof new Date() -> Obect */,
    messages: String,
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('letters', letters);
