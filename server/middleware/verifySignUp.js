const User = require('../models/user.model');

checkDuplicateEmail = (req, res, next) => {
    User.findOne(req.body.emailid, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
        if (data.rowCount > 0) {
            res.status(400).send({
                message: "user already registered!"
            });
        }
        next();
    });
}

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
}

module.exports = verifySignUp;