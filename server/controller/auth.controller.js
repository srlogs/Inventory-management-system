require('dotenv').config()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
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

/**
 *  Authenticate user 
 */
exports.authenticate = function (req, res) {
    var query = "SELECT emailid, password FROM users WHERE emailid = $1";
    var values = req.body.emailid;
    client.query(query, [values], (err, result) => {
        if (err) {
            throw err;
        }
        if (result.rowCount > 0) {
            const user = {
                emailid: req.body.emailid
            };
            const accessToken = jwt.sign(user, process.env.SECRET_TOKEN);
            bcrypt.compare(req.body.password, result.rows[0].password, (err, isMatch) => {
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