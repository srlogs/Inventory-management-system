const sql = require('./db');

/**
 *  Stock management constructor
 */
const Stock = function (stock) {
    this.productid = stock.productid;
    this.initialstock = stock.initialstock;
    this.currentstock = stock.currentstock;
    this.date = stock.date;
}

function tableCreation() {
    var query = "CREATE TABLE IF NOT EXISTS stocks (id SERIAL PRIMARY KEY, productid INTEGER NOT NULL, initialstock VARCHAR(200) NULL DEFAULT 0, currentstock VARCHAR(200) NULL DEFAULT 0, date VARCHAR(50) NULL DEFAULT NULL)";
    sql.query(query, (err, response) => {
        if (err) {
            throw err;
        }
        if (response.rowCount != null) {
            console.log("new table created for stocks...");
        }
    });
}

/**
 *  Add new stock
 */
Stock.create = (newStock, result) => {
    tableCreation();
    var query = "INSERT INTO stocks (productid, initialstock, currentstock, date) VALUES ($1, $2, $3, $4) RETURNING id";
    sql.query(query, [newStock.productid, newStock.initialstock, newStock.currentstock, newStock.date], (err, response) => {
        if (err) {
            throw err;
        } else {
            var id = response.rows[0].id;
            result(null, {
                id,
                ...newStock
            });
        }
    });
}

/**
 *  Get today's stock
 */
Stock.findOneStock = (stockData, result) => {
    tableCreation();
    var query = "SELECT * FROM stocks WHERE productid = $1 AND date = $2";
    sql.query(query, [stockData.productid, stockData.date], (err, response) => {
        if (err) {
            throw err;
        } else {
            if (response.rowCount > 0) {
                result(null, response.rows[0]);
            } else {
                result(null, {
                    message: "no data available",
                    status: 200,
                    data: "empty"
                });
            }
        }
    });
}

/**
 *  Update the stock data
 */
Stock.updateStock = (stockData, result) => {
    tableCreation();
    console.log(stockData);
    var query = "UPDATE stocks SET initialstock = $1 WHERE productid = $2 AND date = $3";
    sql.query(query, [stockData.initialstock, stockData.productid, stockData.date], (err, response) => {
        if (err) {
            throw err;
        } else {
            result(null, response);
        }
    });
}


module.exports = Stock;