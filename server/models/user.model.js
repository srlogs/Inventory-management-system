const sql = require('./db.js');

/**
 *  Constructor of user
 */
const User = function (user) {
    this.name = user.name;
    this.emailid = user.emailid;
    this.password = user.password;
    this.mobile = user.mobile;
}

/**
 * Adding new user
 */
User.create = (newUser, result) => {
    var query = "CREATE TABLE IF NOT EXISTS users ( id SERIAL, name VARCHAR(50) NULL DEFAULT NULL, emailid VARCHAR(100) NOT NULL, password VARCHAR(150) NOT NULL, mobile VARCHAR(20) NULL DEFAULT NULL, PRIMARY KEY(id))";
    sql.query(query, (err, response) => {
        if (err) {
            throw err;
        }
        if (response) {
            console.log("new table is created...");
        }
    })

    query = "INSERT INTO users (name, emailid, password, mobile) VALUES ($1, $2, $3, $4)";
    sql.query(query, [newUser.name, newUser.emailid, newUser.password, newUser.mobile], (err, res) => {
        if (err) {
            throw err;
        }
        result(null, {
            ...newUser
        });
    })
}

/**
 *  Get add users data
 */
User.findAll = (result) => {
    var query = "SELECT * FROM users";
    sql.query(query, (err, res) => {
        if (err) throw err;
        result(null, res.rows);
    })
}

/**
 *  Get single user data
 */
User.findOne = (userEmail, result) => {
    var query = "CREATE TABLE IF NOT EXISTS users ( id SERIAL, name VARCHAR(50) NULL DEFAULT NULL, emailid VARCHAR(100) NOT NULL, password VARCHAR(150) NOT NULL, mobile VARCHAR(20) NULL DEFAULT NULL, PRIMARY KEY(id))";
    sql.query(query, (err, response) => {
        if (err) {
            throw err;
        }
        if (response) {
            console.log("new table is created...");
        }
    })


    query = "SELECT * FROM users WHERE emailid = $1";
    sql.query(query, [userEmail], (err, res) => {
        if (err) {
            throw err;
        }
        if (res)
            result(null, res);
    })
}


module.exports = User;