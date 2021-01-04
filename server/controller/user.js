const mysql = require('mysql');
const config = require('../config/config');

var con = mysql.createConnection(config);

/**
 *  Database connectivity
 */

con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("database is connected...");
})


exports.createUser = function (req, res, next) {
    res.send("new user created...");
}