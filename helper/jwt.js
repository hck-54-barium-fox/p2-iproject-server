const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_SECRET_KEY

function sign(payload) {
    return jwt.sign(payload, JWT_KEY)
}

function decode(token) {
    return jwt.verify(token, JWT_KEY)
}

module.exports = {sign, decode}