// cosmosClient.js
const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config();

const client = new CosmosClient(process.env.COSMOS_CONNECTION_STRING);

const database = client.database(process.env.COSMOS_DB_NAME);
const container = database.container(process.env.COSMOS_CONTAINER_NAME);

module.exports = container;
