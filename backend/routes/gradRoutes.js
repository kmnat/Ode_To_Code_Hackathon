const express = require('express');
const router = express.Router();
const gradController = require('../controllers/gradController');

router.post('/', gradController.createGrad);
router.get('/', gradController.getAllGrads);

module.exports = router;
