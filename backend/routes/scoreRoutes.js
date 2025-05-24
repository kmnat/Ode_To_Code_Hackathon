const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

router.post('/', scoreController.createScore);
router.get('/', scoreController.getAllScores);

module.exports = router;
