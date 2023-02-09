const bcrypt = require('bcryptjs')


module.exports = {
    hash : (password)=>{
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)
        //hash password to db
        return hashPassword
    },
    
    compare : (password, hashPassword)=>{
        //boolean
        return bcrypt.compareSync(password, hashPassword)
    }
}