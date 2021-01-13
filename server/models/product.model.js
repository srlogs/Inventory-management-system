const sql = require('./db');

/**
 *  Product constructor
 */
const Product = function (product) {
    this.title = product.title;
    this.summary = product.summary;
    this.cost = product.cost;
    this.unit = product.unit;
    this.currency = product.currency;
    this.quantity = product.quantity;
}

/**
 *  Adding new Product
 */
Product.create = (newProduct, result) => {
    var query = "CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, title VARCHAR(50) NOT NULL, summary TEXT, cost VARCHAR(20) NOT NULL, unit VARCHAR(10), currency VARCHAR(10), quantity VARCHAR(20) NOT NULL)";
    sql.query(query, (err, response) => {
        if (err) {
            throw err;
        }
        if (response.rowCount != null) {
            console.log("new table created for products...");
        }
    });

    query = "INSERT INTO products (title, summary, cost, unit, currency, quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id";
    sql.query(query, [newProduct.title, newProduct.summary, newProduct.cost, newProduct.unit, newProduct.currency, newProduct.quantity], (err, response) => {
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
    var query = "DELETE FROM products WHERE id = $1";
    sql.query(query, [productId], (err, response) => {
        if (err) {
            throw err;
        }
        result(null, response);
    });
}

module.exports = Product;