const sql = require('./db.js');


/**
 *  Address constructor
 */
const Address = function (address) {
    this.userid = address.userid;
    this.line1 = address.line1;
    this.line2 = address.line2;
    this.city = address.city;
    this.pincode = address.pincode;
}

/**
 * Adding new Address
 */
Address.create = (newAddress, result) => {
    var query = "CREATE TABLE IF NOT EXISTS addresses (id SERIAL PRIMARY KEY, userid INTEGER, line1 TEXT, line2 TEXT, city VARCHAR(50), pincode VARCHAR(20))";
    sql.query(query, (err, response) => {
        if (err) {
            throw err;
        }
        if (response.rowCount != null) {
            console.log("new table for address is created...");
        }
    });

    query = "INSERT INTO addresses (userid, line1, line2, city, pincode) VALUES ($1, $2, $3, $4, $5)";
    sql.query(query, [newAddress.userid, newAddress.line1, newAddress.line2, newAddress.city, newAddress.pincode], (err, res) => {
        if (err) {
            throw err;
        }
        result(null, {
            ...newAddress
        });
    })
}

module.exports = Address;