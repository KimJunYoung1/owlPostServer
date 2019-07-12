const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('error', console.error);

db.once('open', () => {
  console.log('connected to mongod server');
});


module.exports = () => {
  function connect() {
    mongoose.connect(`mongodb://Jveloper:${PASSWORD}@52.15.57.160:27017/test`, { useNewUrlParser: true });
  }
  connect();
};
