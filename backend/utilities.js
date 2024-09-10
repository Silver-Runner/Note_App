const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Get the authorization header
  const authHeader = req.headers['authorization'];
  
  // Split and retrieve the token if the header exists
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is found, return 401 (Unauthorized)
  if (!token) return res.sendStatus(401);

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token is invalid or expired
    
    req.user = user; // Attach user info to the request
   
    next(); // Proceed to the next middleware
  });
}

module.exports = {
  authenticateToken,
};