const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing token' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded.userID;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
