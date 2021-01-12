const User = require('../models/user.model');

checkForCustomer = (req, res, next) => {
    User.findOne(req.user, (err, response) => {
        if (err) {
            throw err;
        } else {
            if (response.rowCount > 0) {
                if (response.rows[0].role == 3 || req.user == "admin") {
                    next();
                } else {
                    res.status(400).send({
                        message: "Unauthorized access"
                    });
                }
            } else if (req.user == "admin") {
                next();
            } else {
                res.status(400).send({
                    message: "Unauthorized access"
                });
            }
        }
    });
}

checkForDeliveryPartner = (req, res, next) => {
    User.findOne(req.user, (err, response) => {
        if (err) {
            throw err;
        } else {
            if (response.rowCount > 0) {
                if (response.rows[0].role == 2) {
                    next();
                } else {
                    res.status(400).send({
                        message: "Unauthorized access"
                    });
                }
            } else if (req.user == "admin") {
                next();
            } else {
                res.status(400).send({
                    message: "Unauthorized access"
                });
            }
        }
    });
}


isAdmin = (req, res, next) => {
    if (req.user == "admin") {
        next();
    } else {
        res.status(400).send({
            message: "Unauthorized access"
        })
    }
}

const verifyRole = {
    checkForCustomer: checkForCustomer,
    checkForDeliveryPartner: checkForDeliveryPartner,
    isAdmin: isAdmin
};

module.exports = verifyRole;