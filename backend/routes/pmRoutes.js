const express = require('express');
const router = express.Router();
const Grad = require('../models/Grad');
const authenticateUser = require('../middleware/auth');

// Middleware to check if user is a PM
const isPM = async (req, res, next) => {
  if (req.user.role !== 'pm') {
    return res.status(403).json({ message: 'Access denied. PM only.' });
  }
  next();
};

// Get all grads with their progress
router.get('/monitor-grads', authenticateUser, isPM, async (req, res) => {
  try {
    const grads = await Grad.find({}, '-password')
      .sort({ score1: -1, score2: -1 });

    const gradsWithProgress = grads.map(grad => {
      const totalScore = (grad.score1 || 0) + (grad.score2 || 0);
      const progress = {
        domino: grad.score1 ? 'Completed' : 'Not Started',
        decisionTree: grad.score2 ? 'Completed' : 'Not Started',
        totalScore,
        overallProgress: totalScore > 0 ? 'In Progress' : 'Not Started'
      };

      return {
        _id: grad._id,
        name: grad.name,
        score1: grad.score1 || 0,
        score2: grad.score2 || 0,
        totalScore,
        progress
      };
    });

    res.json(gradsWithProgress);
  } catch (err) {
    console.error('Error fetching grads progress:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get detailed progress for a specific grad
router.get('/grad-detail/:id', authenticateUser, isPM, async (req, res) => {
  try {
    const grad = await Grad.findById(req.params.id).select('-password');
    if (!grad) {
      return res.status(404).json({ message: 'Grad not found' });
    }

    const totalScore = (grad.score1 || 0) + (grad.score2 || 0);
    const progress = {
      domino: {
        status: grad.score1 ? 'Completed' : 'Not Started',
        score: grad.score1 || 0
      },
      decisionTree: {
        status: grad.score2 ? 'Completed' : 'Not Started',
        score: grad.score2 || 0
      },
      totalScore,
      overallProgress: totalScore > 0 ? 'In Progress' : 'Not Started'
    };

    res.json({
      _id: grad._id,
      name: grad.name,
      ...progress
    });
  } catch (err) {
    console.error('Error fetching grad detail:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router; 