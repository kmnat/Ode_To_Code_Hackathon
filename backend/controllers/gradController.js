const Grad = require('../models/Grad');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.createGrad = async (req, res) => {
  try {
    const grad = new Grad(req.body);
    await grad.save();
    res.status(201).json(grad);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllGrads = async (req, res) => {
  try {
    const grads = await Grad.find();
    console.log("GRADSA", grads);
    res.json(grads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
