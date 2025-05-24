const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalController');

router.get('/games', generalController.getGames);
router.get('/pms', generalController.getPMs);

module.exports = router;
