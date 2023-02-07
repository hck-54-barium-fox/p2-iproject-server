const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

const sign = (payload) => {
    return jwt.sign(payload, secret)
}

const decodeToken = (token) => {
    return jwt.verify(token, secret)
}


module.exports = { sign, decodeToken }