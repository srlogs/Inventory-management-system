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
    var query = "INSERT INTO user SET ?";
    sql.query(query, newUser, (err, res) => {
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
    var query = "SELECT * FROM user";
    sql.query(query, (err, res) => {
        if (err) throw err;
        result(null, res);
    })
}


module.exports = User;