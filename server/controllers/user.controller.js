const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const salt = 10;

/**
 *  Create new user and save user data
 */
exports.create = (req, res) => {

    //  Validate user requests
    if (!req.body) {
        res.status(400).send({
            message: "Contents must not be empty!"
        })
    }

    //  setting role
    var role;
    if (req.body.role === 'shipper') {
        role = 2;
    } else if (req.body.role === 'customer') {
        role = 3;
    } else {
        role = 1;
    }

    //  Hashing the password for security 
    bcrypt.hash(req.body.password, salt, (err, hash) => {

        //  New user
        const user = new User({
            name: req.body.name,
            emailid: req.body.emailid,
            password: hash,
            mobile: req.body.mobile,
            role: role
        });

        User.create(user, (err, result) => {
            if (err) {
                res.status(400).send({
                    message: "Erro while storing the user data" || err.message
                })
            } else {
                res.send(result);
            }
        });
    });
}

/**
 *  Find all users
 */
exports.getAll = (req, res) => {
    User.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Internal server error"
            });
        }
        res.send(data);
    })
}

/**
 *  Remove one user
 */
exports.delete = (req, res) => {
    User.delete(req.params.userId, (err, data) => {
        if (err) {
            res.status(400).send({
                message: err.message
            });
        }
        res.status(200).send({
            message: "user deleted from table..."
        });
    });
}