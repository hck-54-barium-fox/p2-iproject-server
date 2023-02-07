const bcrypt = require("bcryptjs")

function comparePassword(inputPassword, password) {
    return bcrypt.compareSync(inputPassword, password)
}

function hashPassword(password) {
    return bcrypt.hashSync(password, 10)
}

module.exports = {comparePassword, hashPassword}