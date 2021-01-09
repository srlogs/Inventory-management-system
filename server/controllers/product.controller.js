const Product = require('../models/product.model');

/**
 *  Creating product field and adding new products
 */
exports.create = (req, res) => {

    //  Validate user request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    //  New product data
    const product = new Product({
        title: req.body.title,
        summary: req.body.summary,
        price: req.body.price,
        quantity: req.body.quantity
    });

    //  Adding product data
    Product.create(product, (err, response) => {
        if (err) {
            res.status(500).send({
                message: err.message || "some error occured while storing the products"
            });
        } else {
            res.send(response);
        }
    })
}