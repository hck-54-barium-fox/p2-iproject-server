const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

module.exports = {
    hash: (password) => {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        return hash
    },
    compareHash: (password, hash) => {
        return bcrypt.compareSync(password, hash)
    },
    signToken: (payload) => {
        const token = jwt.sign(payload, JWT_SECRET_KEY)

        return token
    },
    verifyToken: (token) => {
        return jwt.verify(token, JWT_SECRET_KEY)
    }

}