const express = require('express');
const router = express.Router();

// Import controllers
const { authUser, registerUser } = require('../controllers/userController');

// Import middleware
const { protect } = require('../middleware/authMiddleware'); // Using the protect middleware for protecting routes

// Auth routes
router.post('/register', registerUser);  // Register a new user
router.post('/login', authUser);         // User login

// Protected route - user profile
router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'Access granted',
    user: req.user,  // req.user will be populated by the protect middleware from the token
  });
});

module.exports = router;





  