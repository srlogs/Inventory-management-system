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

/**
 *  Creating new user
 */
exports.createUser = function (req, res, next) {

    var query = "CREATE TABLE IF NOT EXISTS user( id BIGINT NOT NULL AUTO_INCREMENT, name VARCHAR(50) NULL DEFAULT NULL, emailid VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL, mobile VARCHAR(50) NULL DEFAULT NULL, CONSTRAINT chk_person CHECK(name NOT LIKE '%[^a-z]%' AND emailid LIKE '%@%.%' AND mobile NOT LIKE '%[^0-9]%'), PRIMARY KEY(id))";
    con.query(query, (err, result) => {
        if (err) {
            throw err;
        }
    })
    query = "INSERT INTO user (name, emailid, password, mobile) VALUES ?";

    var values = [
        [req.body.name, req.body.emailid, req.body.password, req.body.mobile]
    ];
    con.query(query, [values], (err, result) => {
        if (err) {
            throw err;
        }
    })
    res.send("new user created...");
}