const bcryptjs = require('bcryptjs')

module.exports = {
    hash:(password) => {
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(password, salt)
        return hash
    },
    compare:(password, hashpassword) => {
        return bcryptjs.compareSync(password, hashpassword)
    }
}