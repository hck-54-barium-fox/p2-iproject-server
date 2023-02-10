const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = 'apaja';

const encodeToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY)
}
const decodeToken = (token) => {
    return jwt.verify(token, JWT_SECRET_KEY)
}

module.exports = { encodeToken, decodeToken }