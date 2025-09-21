const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  logout
} = require('../Controllers/authController');
const {
  validateRegister,
  validateLogin,
  handleValidationErrors
} = require('../middleware/validation');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.post('/logout', authenticateToken, logout);

module.exports = router;