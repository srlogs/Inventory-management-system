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
        cost: req.body.cost,
        discount: req.body.discount == '' ? 0 : req.body.discount,
        gst: req.body.gst
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

/**
 *  Removing the products
 */
exports.delete = (req, res) => {
    Product.delete(req.params.productId, (err, response) => {
        if (err) {
            res.status(400).send({
                message: err.message || "Error while removing the product"
            });
        } else {
            res.status(200).send({
                message: "product removed..."
            });
        }
    });
}

/**
 *  Updating product data
 */
exports.update = (req, res) => {

    const product = {
        id: req.body.id,
        title: req.body.title,
        summary: req.body.summary,
        cost: req.body.cost,
        discount: req.body.discount,
        gst: req.body.gst
    }

    Product.update(product, (err, response) => {
        if (err) {
            res.status(500).send({
                message: err.message || "internal server error"
            });
        } else {
            res.status(200).send(response);
        }
    });
}

/**
 *  Getting all products 
 */
exports.findAll = (req, res) => {
    Product.findAll((err, response) => {
        if (err) {
            res.status(400).send({
                message: err.message || "Error while parsing the data.."
            });
        } else {
            res.status(200).send(response);
        }
    })
}

/**
 *  Get units
 */
exports.findUnits = (req, res) => {
    Product.findUnits((err, data) => {
        if (err) {
            res.status(400).send({
                message: err.message || "Error while parsing the data..."
            });
        } else {
            res.send(data);
        }
    })
}