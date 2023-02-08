const jwt = require('jsonwebtoken')
const secret_key = process.env.JWT_SECRET //pake env

module.exports = {
    signToken : (payload)=>{
        return jwt.sign(payload, secret_key)
    },
    decodeToken : (token) => {
        return jwt.verify(token, secret_key)
    }
}