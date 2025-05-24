const mongoose = require('mongoose');

const pmSchema = new mongoose.Schema({
  _id: String,
  name: String
});

module.exports = mongoose.model('PM', pmSchema);
