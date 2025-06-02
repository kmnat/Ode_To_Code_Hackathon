const express = require('express');
const router = express.Router();
const gradController = require('../controllers/gradController');
const authenticateUser = require('../middleware/auth'); // adjust path as needed
const Grad = require('../models/Grad');

router.post('/', gradController.createGrad);
router.get('/', gradController.getAllGrads);

// Get leaderboard
router.get('/leaderboard', authenticateUser, async (req, res) => {
  try {
    const grads = await Grad.find({}, '-password')
      .sort({ score1: -1, score2: -1 });
    
    // Calculate total score and map to response format
    const leaderboard = grads.map(grad => ({
      _id: grad._id,
      name: grad.name,
      score1: grad.score1 || 0,
      score2: grad.score2 || 0,
      avatarUrl: grad.avatarUrl
    }));

    res.json(leaderboard);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ message: 'Failed to fetch leaderboard', error: err.message });
  }
});

// Get grad profile by ID
router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const grad = await Grad.findById(req.params.id).select('-password');
    if (!grad) {
      return res.status(404).json({ message: 'Grad not found' });
    }
    res.json(grad);
  } catch (err) {
    console.error('Error fetching grad profile:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/update-score', authenticateUser, async (req, res) => {
  const { score1 } = req.body;
  const userId = req.user.id; // from decoded JWT

  try {
    if (!userId) {
      return res.status(400).json({ message: 'User ID not found in token' });
    }

    const grad = await Grad.findById(userId);
    if (!grad) {
      return res.status(404).json({ message: 'Grad not found' });
    }

    // Only update if new score is higher than existing score
    const updated = await Grad.findByIdAndUpdate(
      userId,
      { $max: { score1: score1 } },
      { new: true }
    );

    res.json({ message: 'Score updated', grad: updated });
  } catch (err) {
    console.error('Error updating score:', err);
    res.status(500).json({ message: 'Failed to update score', error: err.message });
  }
});

module.exports = router;
