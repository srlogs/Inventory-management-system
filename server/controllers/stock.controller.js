const Stock = require('../models/stock.model');

/**
 *  Add new stock data
 */
exports.create = (req, res) => {

    //  New stock
    const stock = new Stock({
        productid: req.body.productid,
        initialstock: req.body.initialstock,
        currentstock: req.body.currentstock,
        date: req.body.date
    });

    Stock.create(stock, (err, result) => {
        if (err) {
            res.status(400).send({
                message: "Error while storing the stock information..."
            });
        } else {
            res.send(result);
        }
    });
}

/**
 *  Get one stock data
 */
exports.getOneStock = (req, res) => {
    const stock = {
        productid: req.body.productid,
        date: req.body.date
    }
    Stock.findOneStock(stock, (err, result) => {
        if (err) {
            res.status(400).send({
                message: "Error while parsing the data..."
            })
        }
        res.send(result);
    });
}

/**
 *  Update the stock data
 */
exports.updateStock = (req, res) => {
    const stock = {
        productid: req.body.productid,
        date: req.body.date,
        initialstock: req.body.initialstock
    }
    Stock.updateStock(stock, (err, result) => {
        if (err) {
            res.status(400).send({
                message: "Error while uploading the data..."
            });
        } else {
            res.send(result);
        }
    });
}