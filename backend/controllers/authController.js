const Grad = require('../models/Grad');
const PM = require('../models/PM');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key_here';


// Register Grad
exports.registerGrad = async (req, res) => {
  const { _id, name, password } = req.body;

  try {
    const exists = await Grad.findById(_id);
    if (exists) return res.status(400).json({ error: 'Grad already exists' });

    const newGrad = new Grad({ _id, name, password });
    await newGrad.save();
    res.status(201).json({ message: 'Grad registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register PM
exports.registerPM = async (req, res) => {
  const { _id, name, password } = req.body;

  try {
    const exists = await PM.findById(_id);
    if (exists) return res.status(400).json({ error: 'PM already exists' });

    const newPM = new PM({ _id, name, password });
    await newPM.save();
    res.status(201).json({ message: 'PM registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { _id, password } = req.body;

  try {
    let user = await Grad.findById(_id);
    let role = 'grad';

    if (!user) {
      user = await PM.findById(_id);
      role = 'pm';
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, name: user.name, role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
