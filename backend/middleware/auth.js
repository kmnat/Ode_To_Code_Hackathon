const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    console.log("JWT ==> ", token);
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);  // <-- Log error details
    return res.status(403).json({ message: 'Invalid token' });
  }
};
