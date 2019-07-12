const mongoose = require('mongoose');

const { Schema } = mongoose;

/* time: typeof new Date() -> Obect */
const letters = new Schema(
  {
    from: String,
    to: String,
    time: String,
    messages: String,
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('letters', letters);
