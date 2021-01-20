const sql = require('./db');

/**
 *  Product constructor
 */
const Product = function (product) {
    this.title = product.title;
    this.summary = product.summary;
    this.cost = product.cost;
    this.unit = product.unit;
    this.quantity = product.quantity;
    this.stock = product.stock;
}

function tableCreation() {
    var query = "CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, title VARCHAR(50) NOT NULL, summary TEXT, cost VARCHAR(20) NOT NULL, unit VARCHAR(50), quantity VARCHAR(50) NOT NULL, stock VARCHAR(50) NULL DEFAULT 0)";
    sql.query(query, (err, response) => {
        if (err) {
            throw err;
        }
        if (response.rowCount != null) {
            console.log("new table created for products...");
        }
    });

}

/**
 *  Adding new Product
 */
Product.create = (newProduct, result) => {

    tableCreation();

    query = "INSERT INTO products (title, summary, cost, unit, quantity, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id";
    sql.query(query, [newProduct.title, newProduct.summary, newProduct.cost, newProduct.unit, newProduct.quantity, newProduct.stock], (err, response) => {
        if (err) {
            throw err;
        }
        var id = response.rows[0].id;
        result(null, {
            id,
            ...newProduct
        })
    })
}

/**
 *  Removing the product
 */
Product.delete = (productId, result) => {
    tableCreation();
    var query = "DELETE FROM products WHERE id = $1";
    sql.query(query, [productId], (err, response) => {
        if (err) {
            throw err;
        }
        result(null, response);
    });
}

/**
 *  Get all products
 */
Product.findAll = (result) => {
    tableCreation();

    var query = "SELECT * FROM products";
    sql.query(query, (err, response) => {
        if (err) {
            throw err;
        }
        result(null, response.rows);
    })
}

/**
 *  Get units from table
 */
Product.findUnits = (result) => {
    var query = "SELECT * FROM units";
    sql.query(query, (err, response) => {
        if (err) {
            throw err;
        }
        result(null, response.rows);
    })
}

module.exports = Product;