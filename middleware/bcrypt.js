const bcrypt = require('bcrypt')


module.exports = {
    hashPass(password) {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)

        return hash
    },

    compare(password, hashedPassword){
        return bcrypt.compareSync(password, hashedPassword)
    }
}