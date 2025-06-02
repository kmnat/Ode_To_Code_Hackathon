const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const gradSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // SOEID becomes the document _id
  name: { type: String, required: true },
  password: { type: String, required: true },
  score1: { type: Number, default: 0 },
  score2: { type: Number, default: 0 }
});

// Hash password before saving
// gradSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

module.exports = mongoose.model('Grad', gradSchema);
