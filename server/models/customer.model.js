const sql = require('./db');

/**
 *  Creating constructor for customers
 */
const Customer = function (customer) {
    this.shopname = customer.shopname;
    this.address = customer.address;
    this.mobile = customer.mobile;
}

/**
 *  Storing customer data
 */
Customer.create = (newCustomer, response) => {
    var query = "CREATE TABLE IF NOT EXISTS customers(id SERIAL PRIMARY KEY, shopname VARCHAR(50) NOT NULL, address TEXT NOT NULL, mobile VARCHAR(50) NOT NULL)";

    sql.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        if (res.rowCount != null) {
            console.log("Table created for customers...");
        }
    });

    query = "INSERT INTO customers (shopname, address, mobile) VALUES ($1, $2, $3)";

    sql.query(query, [newCustomer.shopname, newCustomer.address, newCustomer.mobile], (err, res) => {
        if (err) {
            throw err;
        }
        response(null, {
            ...newCustomer
        });
    });
}

/**
 *  Removing customer from table
 */
Customer.delete = (customerId, result) => {
    var query = "DELETE FROM customers WHERE id = $1";

    sql.query(query, [customerId], (err, res) => {
        if (err) {
            throw err;
        }
        result(null, {
            message: "customer is removed!"
        });
    })
}

/**
 *  Get all customers from table
 */
Customer.findAll = (result) => {
    var query = "SELECT * FROM customers";

    sql.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        result(null, res.rows);
    })
}


module.exports = Customer;