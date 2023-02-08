const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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
        const token = jwt.sign(payload, "QrzSAV3NTtwikyNnmtnJw8VH8mfYtVh5yXFWSRx5o6PCLpLkMMigCxoB9ZS8")

        return token
    },
    verifyToken: (token) => {
        return jwt.verify(token, "QrzSAV3NTtwikyNnmtnJw8VH8mfYtVh5yXFWSRx5o6PCLpLkMMigCxoB9ZS8")
    }

}