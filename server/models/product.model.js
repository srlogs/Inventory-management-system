const sql = require('./db');

/**
 *  Product constructor
 */
const Product = function (product) {
    this.title = product.title;
    this.summary = product.summary;
    this.price = product.price;
    this.quantity = product.quantity;
}

/**
 *  Adding new Product
 */
Product.create = (newProduct, result) => {
    var query = "CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, title VARCHAR(50) NOT NULL, summary TEXT, price VARCHAR(20) NOT NULL, quantity VARCHAR(20) NOT NULL)";
    sql.query(query, (err, response) => {
        if (err) {
            throw err;
        }
        if (response.rowCount != null) {
            console.log("new table created for products...");
        }
    });

    query = "INSERT INTO products (title, summary, price, quantity) VALUES ($1, $2, $3, $4)";
    sql.query(query, [newProduct.title, newProduct.summary, newProduct.price, newProduct.quantity], (err, response) => {
        if (err) {
            throw err;
        }
        result(null, {
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