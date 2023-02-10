const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash
}

const checkPassword = (passwordUser, passwordDb) => {
    return bcrypt.compareSync(passwordUser, passwordDb);
}

module.exports = { hashPassword, checkPassword }