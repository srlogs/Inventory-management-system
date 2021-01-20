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
 *  Table creation
 */
function tableCreation() {
    var query = "CREATE TABLE IF NOT EXISTS customers(id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL,  mobile VARCHAR(50) NOT NULL, emailid VARCHAR(150) NULL DEFAULT NULL, userid VARCHAR(10) NULL DEFAULT NULL)";

    sql.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        if (res.rowCount != null) {
            console.log("Table created for customers...");
        }
    });
}

/**
 *  Storing customer data
 */
Customer.create = (newCustomer, response) => {


    var query = "INSERT INTO customers (name, emailid, mobile, userid) VALUES ($1, $2, $3, $4) RETURNING id";

    sql.query(query, [newCustomer.customername, newCustomer.emailid, newCustomer.mobile, newCustomer.userId], (err, res) => {
        if (err) {
            throw err;
        }
        var id = res.rows[0].id;
        query = "CREATE TABLE IF NOT EXISTS customer_addresses (id SERIAL PRIMARY KEY, customerid integer NOT NULL REFERENCES customers(id) ON DELETE CASCADE, shopname VARCHAR(100) NULL DEFAULT NULL, address TEXT NULL DEFAULT NULL, from_table VARCHAR(50), FOREIGN KEY(id) REFERENCES customers(id))";

        sql.query(query, (err, res) => {
            if (err) {
                throw err;
            }
        });

        query = "INSERT INTO customer_addresses (customerid, shopname, address, from_table) VALUES ($1, $2, $3, $4)";

        sql.query(query, [id, newCustomer.shopname, newCustomer.address, 'customer'], (err, res) => {
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
    tableCreation();
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
    tableCreation();
    var query = "SELECT c.id, c.name, c.emailid, c.mobile, ca.shopname, ca.address FROM customers AS c, customer_addresses AS ca WHERE c.id = ca.customerid";

    sql.query(query, (err, res) => {
        if (err) {
            throw err;
        }

        result(null, res.rows);
    })
}

/**
 *  Find one customer
 */
Customer.findOne = (customerId, result) => {
    tableCreation();
    var query = "SELECT * FROM customers WHERE id = $1";

    sql.query(query, [customerId], (err, response) => {
        if (err) {
            throw err;
        }
        result(null, response.rows[0]);
    })
}


module.exports = Customer;