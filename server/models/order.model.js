const sql = require('./db');

/**
 *  Constructor for storing order details
 */
const Order = function (order) {
    this.customerid = order.customerid;
    this.productid = order.productid;
    this.quantity = order.quantity;
    this.price = order.price;
    this.role = order.role;
}

/**
 *  Adding order details
 */
Order.create = (newOrder, result) => {
    var query = "CREATE TABLE IF NOT EXISTS orders(id SERIAL PRIMARY KEY, customerid INTEGER NOT NULL, productid INTEGER NOT NULL, quantity VARCHAR(50) NOT NULL, price VARCHAR(50) NOT NULL, date VARCHAR(50), time VARCHAR(50), status VARCHAR(10), vendor VARCHAR(50))";

    sql.query(query, (err, res) => {
        if (err) {
            throw err;
        }
        if (res.rowCount != null) {
            console.log("Table created for orders...");
        }
    });

    query = "INSERT INTO orders (customerid, productid, quantity, price, date, time, status, vendor) VALUES ($1, $2, $3, $4, current_date, current_time, 1, $5)";

    sql.query(query, [newOrder.customerid, newOrder.productid, newOrder.quantity, newOrder.price, newOrder.role], (err, response) => {
        if (err) {
            throw err;
        }
        result(null, {
            ...newOrder
        });
    });
}

/**
 *  Removing order details
 */
Order.delete = (orderId, result) => {
    var query = "DELETE FROM orders WHERE id = $1";

    sql.query(query, [orderId], (err, response) => {
        if (err) {
            throw err;
        }
        result(null, {
            message: "order is cancelled"
        })
    })
}


module.exports = Order;