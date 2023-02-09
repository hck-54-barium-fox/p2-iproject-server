const jwt = require("jsonwebtoken")

function signToken(data){
    return jwt.sign(data,"sangatrahasiabro")
}

function decodeToken(token){
    return jwt.verify(token,"sangatrahasiabro")
}


module.exports={signToken,decodeToken}