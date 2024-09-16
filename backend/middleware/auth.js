// auth.js in middleware directory
const jwt = require('jsonwebtoken');


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // If there's no token, return Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification error:', err); // Log the error
      return res.sendStatus(403); // If the token is invalid, return Forbidden
    }
    req.user = user;
    next();
  });
};

// const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) { 
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ message: 'Access Denied' });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid Token' });
//   }
// }

module.exports = authenticateToken;
