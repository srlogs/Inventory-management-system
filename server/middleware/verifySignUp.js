const User = require('../models/user.model');


checkDuplicateEmail = (req, res, next) => {
    User.findOne(req.body.emailid, (err, result) => {
        if (result.rowCount != 0) {
            res.status(400).send({
                message: "user already registered.."
            })
        } else {
            next();
        }
    })
}

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
}

module.exports = verifySignUp