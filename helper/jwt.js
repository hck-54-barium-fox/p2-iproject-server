const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "devicantik"

function sign(payload) {
    return jwt.sign(payload, JWT_SECRET_KEY)
}

function decode(token) {
    return jwt.verify(token, JWT_SECRET_KEY)
}

module.exports = {sign, decode}