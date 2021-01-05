const Address = require('../models/address.model');
const User = require('../models/user.model');

/**
 *  Creating address field and save address
 */
exports.create = (req, res) => {

    //  Validate user request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    User.findOne(req.user, (err, data) => {
        if (err) {
            res.status(400).send({
                message: err.message || "User not found!"
            })
        }
        if (data.rowCount > 0) {

            //  New Address data
            const address = new Address({
                userid: data.rows[0].id,
                line1: req.body.line1,
                line2: req.body.line2,
                city: req.body.city,
                pincode: req.body.pincode
            });

            //  Save address
            Address.create(address, (err, response) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "some error occured while storing the adderss"
                    });
                } else {
                    res.send(response);
                }
            });
        }
    });
}