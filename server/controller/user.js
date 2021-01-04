const mysql = require('mysql');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const auth_controller = require('./auth');
const salt = 10;

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
    bcrypt.hash(req.body.password, salt, (err, hash) => {
        var values = [
            [req.body.name, req.body.emailid, hash, req.body.mobile]
        ];
        con.query(query, [values], (err, result) => {
            if (err) {
                throw err;
            }
        })
    })
    res.send("new user created...");
}

/**
 *  Get all users
 */
exports.getUsers = function (req, res, next) {
    auth_controller.data.validate(req, res, next);

    if (req.user == null || req.user == undefined) {
        res.send("invalid user");
    } else {
        var query = "SELECT * FROM user";

        con.query(query, (err, result) => {
            if (err) throw err;
            res.send(result);
        })
    }
}