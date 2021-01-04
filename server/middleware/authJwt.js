require('dotenv').config();
const jwt = require('jsonwebtoken');

validate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return token;
    }
    jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {
        if (err) throw err;
        req.user = data.emailid;
        next();
    })
}

const authJwt = {
    validate: validate
}

module.exports = authJwt;