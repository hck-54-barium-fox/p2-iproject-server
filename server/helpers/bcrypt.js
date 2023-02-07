const bcrypt = require('bcryptjs');

function hashPassword (password) {
    const hash = bcrypt.hashSync(password,8)
    return hash;
}
function comparePassword (password, hashedPassword) {
    const compare = bcrypt.compareSync(password, hashedPassword)
    return compare;
}

module.exports = {
    hashPassword,
    comparePassword
}