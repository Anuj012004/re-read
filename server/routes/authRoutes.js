// // routes/authRoutes.js
// const express = require('express');
// const router = express.Router(); 
// const { register, login, logout, getCurrentUser } = require('../controllers/authController');
// const { protect } = require('../middleware/auth');
// const validation = require('../middleware/validation');




// // Public routes
// router.post('/register', validation.validateRegister, register); 
// router.post('/login', validation.validateLogin, login);

// // Protected routes
// router.post('/logout', protect, logout);
// router.get('/me', protect, getCurrentUser);

// module.exports = router;


const express = require('express');
const router = express.Router(); 
const { 
  register, 
  login, 
  logout, 
  getCurrentUser,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validation = require('../middleware/validation');

// Public routes
router.post('/register', validation.validateRegister, register); 
router.post('/login', validation.validateLogin, login);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerification);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Protected routes
router.post('/logout', protect, logout);
router.get('/me', protect, getCurrentUser);

module.exports = router;