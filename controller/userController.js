const { User } = require('../models')
const { signToken } = require('../helper/jwt')
const { compare } = require('../helper/bcrypt')

class userController {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { code: 400, message: "Email is required" }
            }
            const newUser = await User.create({ email, password })
            res.status(201).json({
                id: newUser.id,
                email: newUser.email
            })
        } catch (err) {
            console.log(err);
            if (err.code) {
                res.status(err.code).json({ message: err.message })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }

    static async login(req, res, next) {
        const { email, password } = req.body
        try {
            if (!email) {
                throw { code: 400, message: "Email is required" }
            }
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                throw { code: 401, message: "Invalid email/password" }
            }
            let comparePassword = compare(password, user.password)
            if (!comparePassword) {
                throw { code: 401, message: "Invalid email/password" }
            } else {
                const { id, email } = user
                let access_token = signToken({
                    id,
                    email
                })
                res.status(200).json({ access_token })
            }
        } catch (err) {
            console.log(err);
            if (err.code) {
                res.status(err.code).json({ message: err.message })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }

        }
    }
}

module.exports = userController