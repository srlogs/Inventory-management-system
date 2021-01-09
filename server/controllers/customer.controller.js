const Customer = require('../models/customer.model');

/**
 *  Adding new customers 
 */
exports.create = (req, res) => {

    //  Validate user requests
    if (!req.body) {
        res.status(400).send({
            message: "Contents must not be empty!"
        })
    }

    //  New Customer
    const customer = new Customer({
        shopname: req.body.shopname,
        address: req.body.address,
        mobile: req.body.mobile
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
}

//  Removing customer 
exports.delete = (req, res) => {
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