const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para hacer login (autenticación)
router.post('/login', authController.login);

module.exports = router;
