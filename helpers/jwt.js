const jwt = require('jsonwebtoken')

module.exports = {
    sign: (payload) => {
        // console.log();
        return jwt.sign(payload, 'hehe')
    },
    decodepayload: (access_token) => {
        return jwt.verify(access_token, 'hehe')
    }
}