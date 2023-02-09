const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = "barium"

function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET_KEY)
}

function decodeToken(token) {
    return jwt.verify(token, JWT_SECRET_KEY)
}

module.exports = {signToken, decodeToken}
