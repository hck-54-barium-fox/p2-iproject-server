const jwt = require('jsonwebtoken')


module.exports ={
sign :(payload) => {
    return jwt.sign(payload,"secret")
},
verify : (playload) => {
    return jwt.verify(playload,"secret")
}  
}