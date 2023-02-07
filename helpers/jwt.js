const jwt = require('jsonwebtoken')

const secret = "rahasia"
module.exports={
    sign: (data)=>{
        return jwt.sign(data, secret)
    },
    decode: (token)=>{
        return jwt.verify(token, secret)
    }
    
}