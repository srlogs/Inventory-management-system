const sql = require('./db');

/**
 *  Creating constructor for customers
 */
const Customer = function (customer) {
    this.customername = customer.customername;
    this.shopname = customer.shopname;
    this.address = customer.address;
    this.mobile = customer.mobile;
    this.emailid = customer.emailid;
    this.userId = customer.userId;
}

/**
 *  Storing customer data
 */
Customer.create = (newCustomer, response) => {
    var query = "CREATE TABLE IF NOT EXISTS customers(id SERIAL PRIMARY KEY, customername VARCHAR(50) NOT NULL, shopname VARCHAR(50) NOT NULL, mobile VARCHAR(50) NOT NULL, emailid VARCHAR(150) NULL DEFAULT NULL, userid VARCHAR(10) NULL DEFAULT NULL)";

    sql.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        if (res.rowCount != null) {
            console.log("Table created for customers...");
        }
    });

    query = "INSERT INTO customers (customername, shopname, emailid, mobile, userid) VALUES ($1, $2, $3, $4, $5) RETURNING id";

    sql.query(query, [newCustomer.customername, newCustomer.shopname, newCustomer.emailid, newCustomer.mobile, newCustomer.userId], (err, res) => {
        if (err) {
            throw err;
        }
        var id = res.rows[0].id;
        query = "CREATE TABLE IF NOT EXISTS customer_addresses (id SERIAL PRIMARY KEY, customerid integer REFERENCES customers(id) ON DELETE CASCADE, address TEXT NOT NULL, FOREIGN KEY(customerid) REFERENCES customers(id))";

        sql.query(query, (err, res) => {
            if (err) {
                throw err;
            }
        });

        query = "INSERT INTO customer_addresses (customerid, address) VALUES ($1, $2)";

        sql.query(query, [id, newCustomer.address], (err, res) => {
            if (err) {
                throw err;
            }
        })
        response(null, {
            id,
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