const Order = require('../models/order.model');

/**
 *  Create and save orders
 */
exports.create = (req, res) => {
    const order = new Order({
        customerid: req.body.customerid,
        productid: req.body.productid,
        quantity: req.body.quantity,
        price: req.body.price
    });

    Order.create(order, (err, response) => {

        if (err) {
            res.status(400).send({
                message: err.message
            });
        } else
            res.send(response);
    })
}

/**
 *  Deleting a record from order table
 */
exports.delete = (req, res) => {
    Order.delete(req.params.orderId, (err, data) => {
        if (err) {
            res.status(400).send({
                message: err.message
            });
        } else {
            res.send(data);
        }
    });
}