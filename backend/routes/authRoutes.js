const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// LOGIN
router.post('/login', authController.login);

// REGISTER
router.post('/register/grad', authController.registerGrad);
router.post('/register/pm', authController.registerPM);

module.exports = router;
