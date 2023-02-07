const jwt = require('jsonwebtoken')

module.exports = {
    encodedToken: (payload) => {
        return jwt.sign(payload, 'SECRET')
    },
    decodedToken: (token) => {
        return jwt.verify(token, 'SECRET')
    }
}