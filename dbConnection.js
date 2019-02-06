const mongoose = require('mongoose');
const debug = require('debug')('dbconnection');
const config = require('./config');

mongoose.connect(config.db_URL, {
  useNewUrlParser: true,
}, (err) => {
  if (err) {
    console.log('error occur: ', err);
    debug('Error to connect to DB ', err);
  } else {
    debug('Connected successfully');
    console.log('connect successfully to mLab');
  }
});