const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const pmSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // SOEID becomes the document _id
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'pm' }
});

// Hash password before saving
pmSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('PM', pmSchema);
