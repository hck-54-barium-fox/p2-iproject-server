const jwt = require('jsonwebtoken')
const secret_key = process.env.JWT_SECRET_KEY //pake env

module.exports = {
    signToken : (payload)=>{
        return jwt.sign(payload, secret_key)
    }
}