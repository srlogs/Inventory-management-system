const sql = require('./db');

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
 *  User table creation
 */
tableCreation = () => {
    var query = "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, emailid VARCHAR(100) NOT NULL, password VARCHAR(150) NOT NULL, mobile VARCHAR(20))";

    sql.query(query, (err, response) => {
        if (err) {
            throw err;
        }
        if (response.rowcount != null) {
            console.log("New table created for user...");
        }
    });
}


/**
 *  Creating new user
 */
User.create = (newUser, result) => {
    tableCreation();

    query = "INSERT INTO users (name, emailid, password, mobile) VALUES ($1, $2, $3, $4)";

    sql.query(query, [newUser.name, newUser.emailid, newUser.password, newUser.mobile], (err, response) => {
        if (err) {
            throw err;
        }
        result(null, {
            ...newUser
        });
    });
}

/**
 *  Find one user
 */
User.findOne = (userEmail, result) => {
    tableCreation();

    query = "SELECT * FROM users WHERE emailid = $1";

    sql.query(query, [userEmail], (err, response) => {
        if (err) {
            throw err;
        }
        result(null, response);
    });
}

/**
 *  Find all users
 */
User.findAll = (result) => {
    var query = "SELECT * FROM users";

    sql.query(query, (err, response) => {
        if (err) {
            throw err;
        }
        result(null, response.rows);
    })
}

/**
 *  Remove user from table
 */
User.delete = (userId, result) => {
    var query = "DELETE FROM users WHERE id = $1";

    sql.query(query, [userId], (err, response) => {
        if (err) {
            throw err;
        }
        result(null, response);
    })
}

module.exports = User;