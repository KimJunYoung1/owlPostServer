const mongoose = require('mongoose');

const db = mongoose.connection;

// eslint-disable-next-line no-console
db.on('error', console.error);

db.once('open', () => {
  // eslint-disable-next-line no-console
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
