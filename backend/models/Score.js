const mongoose = require('mongoose');

const score = new mongoose.Schema({
  _id: String,
  gameId: String,
  gradSoeid: String,
  points: Number
});

module.exports = mongoose.model('Score', score);
