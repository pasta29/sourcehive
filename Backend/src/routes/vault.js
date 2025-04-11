const express = require('express');
const { CosmosClient } = require('@azure/cosmos');
const auth = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);
const vaultContainer = client.database(process.env.COSMOS_DB_NAME).container(process.env.COSMOS_USER_VAULT_CONTAINER);
const { v4: uuidv4 } = require('uuid');

// Add new credential
router.post('/', auth, async (req, res) => {
  const { platform, username, password } = req.body;

  const newEntry = {
    id: uuidv4(),
    userID: req.userID,
    platform,
    username,
    password
  };

  try {
    await vaultContainer.items.create(newEntry);
    res.status(201).json({ message: 'Credential stored successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to store credential', details: err.message });
  }
});

// Get credentials
router.get('/', auth, async (req, res) => {
  try {
    const { resources } = await vaultContainer.items
      .query({
        query: 'SELECT * FROM c WHERE c.userID = @userID',
        parameters: [{ name: '@userID', value: req.userID }]
      })
      .fetchAll();

    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch credentials', details: err.message });
  }
});

module.exports = router;
