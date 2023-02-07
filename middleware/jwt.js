///----JWT----///
let jwt = require('jsonwebtoken')

let JWT_KEY = 'yahoo'


module.exports = {
    createToken(payload) {
        return jwt.sign(payload, JWT_KEY)
    },

    decodeToken(token) {
        return jwt.verify(token, JWT_KEY)
    }
}