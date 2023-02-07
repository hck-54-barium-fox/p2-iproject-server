const bcrypt = require('bcryptjs');



const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(5)
    return bcrypt.hashSync(password, salt)
}

const comparePass = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}

module.exports = { hashPassword, comparePass }