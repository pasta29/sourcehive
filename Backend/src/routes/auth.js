const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const container = require('../cosmosClient');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { userID, masterPassword } = req.body;
  const passwordHash = await bcrypt.hash(masterPassword, 10);

  try {
    const { resources: existing } = await container.items
      .query({ query: "SELECT * FROM c WHERE c.userID = @userID", parameters: [{ name: "@userID", value: userID }] })
      .fetchAll();

    if (existing.length > 0) return res.status(409).json({ message: "User already exists" });

    const newUser = {
      id: userID, // id is required in Cosmos
      userID,
      passwordHash
    };

    await container.items.create(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { userID, masterPassword } = req.body;

  try {
    const { resources } = await container.items
      .query({ query: "SELECT * FROM c WHERE c.userID = @userID", parameters: [{ name: "@userID", value: userID }] })
      .fetchAll();

    const user = resources[0];
    if (!user || !(await bcrypt.compare(masterPassword, user.passwordHash))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});

module.exports = router;
