const jwt = require('jsonwebtoken')

module.exports = {
    createToken: (payload) => jwt.sign(payload, `rahasia`),
    decodeToken: (payload) => jwt.verify(payload, `rahasia`)
}