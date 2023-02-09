const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = process.env.JWT_SECRET

const hashPassword = ((password)=>{
    const hash = bcrypt.hashSync(password, 8)
    return hash
})
const compareHash = ((password, hashPass)=>{
    const compare = bcrypt.compareSync(password, hashPass)
    return compare
})
const signToken = ((payload)=>{
    const create = jwt.sign(payload, secret)
    return create
})
const decodeToken = ((payload)=>{
    const verify = jwt.verify(payload, secret)
    return verify
})

module.exports = {hashPassword, compareHash, signToken, decodeToken}