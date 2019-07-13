const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('error', console.error);

db.once('open', () => {
  console.log('connected to mongod server');
});

module.exports = () => {
  function connect() {
    mongoose.connect(`mongodb://${process.env.MONGO_URL}`, {
      useNewUrlParser: true,
    });
  }
  connect();
};
