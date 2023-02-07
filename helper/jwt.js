const jwt = require('jsonwebtoken')

module.exports = {
    sign: (payload) => {
                return jwt.sign(payload, process.env.SECRET_CODING)
            },
    verify: (resultToken)=> { // mengubah token menjadi obj
        return jwt.verify(resultToken, process.env.SECRET_CODING)
    }
}