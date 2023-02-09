const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function hash(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

function compare(password, hash) {
    return bcrypt.compareSync(password, hash);
}

function sign(payload) {
    return jwt.sign(payload, 'larismanis');
}

function decode(token) {
    return jwt.verify(token, 'larismanis');
}

module.exports = { hash, compare, sign, decode }