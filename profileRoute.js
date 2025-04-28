const express = require('express');
const router = express.Router();

// Import authentication middleware
const { protect } = require('../middleware/authMiddleware');

// Import User model
const User = require('../models/User');

// Route to get user profile
router.get('/', protect, async (req, res) => {
  try {
    // Retrieve user info based on the user ID in the token (decoded and attached by authMiddleware)
    const user = await User.findById(req.user.id).select('-password');  // Exclude password from the response

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);  // Return user data
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;

