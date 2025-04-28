// middleware/authMiddleware.js
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Protect middleware function
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];  // Get token from Authorization header

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using secret
      console.log('Decoded JWT Payload:', decoded);  // Log the decoded payload for debugging
      req.user = decoded.user;  // Attach the user data to the request object
      next();  // Call the next middleware
    } catch (err) {
      console.error('Token Verification Error:', err);  // Log the error for debugging
      return res.status(401).json({ msg: 'Token is not valid' });  // If token verification fails
    }
  } else {
    return res.status(401).json({ msg: 'No token, authorization denied' });  // If no token is provided
  }
};

module.exports = { protect };



