const {
    Client
} = require('pg');
const db = require('../config/index');

const client = new Client({
    connectionString: db.config.database,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

module.exports = client;