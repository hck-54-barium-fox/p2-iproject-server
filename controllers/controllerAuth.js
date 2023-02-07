const { checkPassword } = require('../helpers/bcrypt')
const { encodeToken } = require('../helpers/jwt')
const { User} = require('../models/index')

class ControllerAuth {
    static async register(req, res, next) {
        try {
            console.log(req.body)
            const { email, password } = req.body
            const regisUser = await User.create({ email, password })
            res.status(201).json({ id: regisUser.id, email: regisUser.email })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerAuth