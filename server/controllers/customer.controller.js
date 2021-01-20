const Customer = require('../models/customer.model');
const User = require('../models/user.model');

/**
 *  Adding new customers 
 */
exports.create = (req, res) => {
    var userId = null;
    var emailid = req.body.emailid != null ? req.body.emailid : null;
    User.findOne(req.user, (err, response) => {
        if (err) {
            throw err;
        } else {
            if (response.rowCount != 0) {
                userId = response.rows[0].id;
            } else {
                if (req.user == "admin");
                userId = "admin";
            }
        }
        //  New Customer
        const customer = new Customer({
            customername: req.body.customername,
            shopname: req.body.shopname,
            address: req.body.address,
            mobile: req.body.mobile,
            emailid: emailid,
            userId: userId
        });

        //  Saving customer data into the database
        Customer.create(customer, (err, data) => {
            if (err) {
                res.status(400).send({
                    message: err.message || "Error while saving the customer!"
                });
            } else {
                res.send(data);
            }
        });
    });
}

//  Removing customer 
exports.delete = (req, res) => {
    Customer.findOne(req.params.customerId, (err, data) => {
        if (err) {
            res.status(400).send({
                message: err.message || "Error while parsing the data!"
            });
        } else {
            if (data.userid != 'admin') {
                User.delete(data.userid, (err, response) => {
                    if (err) {
                        res.status(400).send({
                            message: err.message || "Erro while deleting the data"
                        });
                    } else {
                        console.log(response)
                    }
                });
            }
        }
    });

    Customer.delete(req.params.customerId, (err, data) => {
        if (err) {
            res.status(400).send({
                message: err.message || "Error while deleting the customer!"
            });
        } else {
            res.send(data);
        }
    });


}

//  Get all customers
exports.getAll = (req, res) => {
    Customer.findAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Internal server error"
            });
        } else {
            res.send(data);
        }
    });
}