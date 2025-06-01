const express = require('express');
const router = express.Router();
const gradController = require('../controllers/gradController');
const authenticateUser = require('../middleware/auth'); // adjust path as needed

router.post('/', gradController.createGrad);
router.get('/', gradController.getAllGrads);

router.post('/update-score', authenticateUser, async (req, res) => {
  const { score1 } = req.body;
  const userId = req.user.id; // from decoded JWT

  try {
    const updated = await Grad.findByIdAndUpdate(
      userId,
      { score1 },
      { new: true }
    );

    res.json({ message: 'Score updated', grad: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update score', error: err });
  }
});

module.exports = router;
