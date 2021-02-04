const sql = require('./db');

/**
 *  Product constructor
 */
const Product = function (product) {
    this.title = product.title;
    this.summary = product.summary;
    this.cost = product.cost;
    this.discount = product.discount;
    this.gst = product.gst;
}

function tableCreation() {
    var query = "CREATE TABLE IF NOT EXISTS products (id SERIAL PRIMARY KEY, title VARCHAR(50) NOT NULL, summary TEXT, cost VARCHAR(20) NOT NULL,  discount VARCHAR(50) NULL DEFAULT 0, gst VARCHAR(50) NULL DEFAULT NULL)";
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

    var query = "INSERT INTO products (title, summary, cost, discount, gst) VALUES ($1, $2, $3, $4, $5) RETURNING id";
    sql.query(query, [newProduct.title, newProduct.summary, newProduct.cost, newProduct.discount, newProduct.gst], (err, response) => {
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
    });
}

/**
 *  Get single product data
 */
Product.findOne = (productId, result) => {
    tableCreation();

    var query = "SELECT * FROM products WHERE id = $1";
    sql.query(query, [productId], (err, response) => {
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

/**
 *  Updating data
 */
Product.update = (product, result) => {
    tableCreation();

    var query = "UPDATE products SET title = $2, summary = $3, cost = $4, discount = $5, gst = $6 WHERE id = $1";

    sql.query(query, [product.id, product.title, product.summary, product.cost, product.discount, product.gst], (err, response) => {
        if (err) {
            throw err;
        }
        result(null, response);
    });
}

module.exports = Product;