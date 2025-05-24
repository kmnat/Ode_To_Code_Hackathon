const mongoose = require('mongoose');

const gradSchema = new mongoose.Schema({
  _id: String,
  name: String
});

module.exports = mongoose.model('Grad', gradSchema, 'grad');
