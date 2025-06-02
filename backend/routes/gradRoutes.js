const express = require('express');
const router = express.Router();
const gradController = require('../controllers/gradController');
const authenticateUser = require('../middleware/auth'); // adjust path as needed
const Grad = require('../models/Grad');

router.post('/', gradController.createGrad);
router.get('/', gradController.getAllGrads);

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
