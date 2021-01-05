// const mysql = require('pg');
const config = require('../config/config');

// var connection = mysql.createPool({
//     host: config.host,
//     user: config.user,
//     password: config.password,
//     database: config.database
// });

const {
    Client
} = require('pg');

const client = new Client({
    connectionString: config.database,
    ssl: {
        rejectUnauthorized: false
    }
})

client.connect();

module.exports = client;