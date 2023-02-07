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
    static async login(req, res, next) {
        try {
            console.log(req.body)
            const { email, password } = req.body
            if (!email) {
                throw { message: "Email is required" }
            }
            if (!password) {
                throw { message: "Password is required" }
            }
            const dataUser = await User.findOne({ where: { email } })

            if (!dataUser) {
                throw { message: 'Invalid email/password' }
            } else {
                const isValidPassword = checkPassword(password, dataUser.password)

                if (!isValidPassword) {
                    throw { message: 'Invalid email/password' }
                } else {
                    const { id, email } = dataUser
                    const access_token = encodeToken({ id, email })
                    res.status(200).json({ access_token })
                }
            }
        } catch (error) {
            next(error)
        }
    }

}

module.exports = ControllerAuth