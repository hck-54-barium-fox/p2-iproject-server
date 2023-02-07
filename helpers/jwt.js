const jwt = require('jsonwebtoken')
const secret_key = 'abc' //pake env

module.exports = {
    signToken : (payload)=>{
        return jwt.sign(payload, secret_key)
    }
}