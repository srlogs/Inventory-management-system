require('dotenv').config();
const jwt = require('jsonwebtoken');

validate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, process.env.SECRET_TOKEN, (err, data) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.user = data.emailid;
        next();
    })
}

const authJwt = {
    validate: validate
}

module.exports = authJwt;