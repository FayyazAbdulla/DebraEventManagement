const jwt = require('jsonwebtoken');

module.exports.verifyToken = function (req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    console.log('No Authorization header found');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('No token found in Authorization header');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    console.log('Token received:', token);
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded.userId;
    console.log('Token decoded successfully:', decoded);
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
