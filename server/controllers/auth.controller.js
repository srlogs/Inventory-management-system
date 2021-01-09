require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('../models/db');


/**
 *  Authenticate user
 */
exports.authenticate = (req, res) => {
    var query = "SELECT emailid, password FROM users WHERE emailid = $1";
    var values = req.body.emailid;

    sql.query(query, [values], (err, result) => {
        if (err) {
            res.status(400).send({
                message: err.message
            });
        }
        if (result.rowCount > 0) {
            const user = {
                emailid: req.body.emailid
            };
            const accessToken = jwt.sign(user, process.env.TOKEN_SECRET);
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