require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user_controller = require('./user.js');
const mysql = require('mysql');
const config = require('../config/config.js');


var con = mysql.createConnection(config);
var methods = {};

/**
 *  Authenticate user 
 */
exports.authenticate = function (req, res, next) {
    var query = "SELECT emailid, password FROM user WHERE emailid = ?";
    var values = req.body.emailid;
    con.query(query, values, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            const user = {
                emailid: req.body.emailid
            };
            const accessToken = jwt.sign(user, process.env.SECRET_TOKEN);
            bcrypt.compare(req.body.password, result[0].password, (err, isMatch) => {
                if (err) {
                    throw err;
                }
                if (isMatch) {
                    res.json({
                        accesstoken: accessToken,
                        status: 200
                    });
                } else {
                    res.json({
                        status: 400
                    });
                }
            });
        }
    });
}

/**
 *  Validate access token 
 */
var methods = {
    validate: function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            return token;
        }
        jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {
            if (err) throw err;
            req.user = data.emailid;
        })
    }
}

exports.data = methods;