const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const pmSchema = new mongoose.Schema({
  _id: String,
  name: String,
  password: { type: String, required: true }
});

pmSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('PM', pmSchema);
