const Grad = require('../models/Grad');
const PM = require('../models/PM');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Grad Registration
exports.registerGrad = async (req, res) => {
  const { _id, name, password } = req.body;

  if (!_id || !name || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const exists = await Grad.findById(_id);
    if (exists) return res.status(400).json({ error: 'Grad already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newGrad = new Grad({ _id, name, password: hashedPassword });
    await newGrad.save();

    res.status(201).json({ message: 'Grad registered successfully' });
  } catch (err) {
    console.error('Error in registerGrad:', err);
    res.status(500).json({ error: 'Server error while registering Grad' });
  }
};

// PM Registration
exports.registerPM = async (req, res) => {
  const { _id, name, password } = req.body;

  if (!_id || !name || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const exists = await PM.findById(_id);
    if (exists) return res.status(400).json({ error: 'PM already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPM = new PM({ _id, name, password: hashedPassword });
    await newPM.save();

    res.status(201).json({ message: 'PM registered successfully' });
  } catch (err) {
    console.error('Error in registerPM:', err);
    res.status(500).json({ error: 'Server error while registering PM' });
  }
};

// Login for both Grad and PM
exports.login = async (req, res) => {
  const { _id, password } = req.body;

  try {
    let user = await Grad.findById(_id);
    let role = 'grad';

    if (!user) {
      user = await PM.findById(_id);
      role = 'pm';
    }

    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: '2h' });

    res.json({ token, name: user.name, role }); // Send proper name
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed. Please try again.' });
  }
};
