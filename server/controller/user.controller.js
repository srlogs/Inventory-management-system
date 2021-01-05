const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const salt = 10;



/**
 *  Creating and save new user data
 */
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    bcrypt.hash(req.body.password, salt, (err, hash) => {
        // New user data
        const user = new User({
            name: req.body.name,
            emailid: req.body.emailid,
            password: hash,
            mobile: req.body.mobile
        })

        //  Save user into the database
        User.create(user, (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the user."
                });
            else res.send(data);
        })
    })
}

/**
 *  Get all users
 */
exports.getUsers = function (req, res, next) {
    User.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            });
        else res.send(data);
    })
}