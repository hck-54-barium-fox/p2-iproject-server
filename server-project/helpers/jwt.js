const jwt = require('jsonwebtoken')

function signToken(payload) {
    return jwt.sign(payload, 'barium')
}

function verifityToken(token) {
    return jwt.verify(token, 'barium')
}
module.exports = { signToken, verifityToken }