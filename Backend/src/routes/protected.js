const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/dashboard', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing token' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: `Welcome ${decoded.userID}!` });
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
});

module.exports = router;
