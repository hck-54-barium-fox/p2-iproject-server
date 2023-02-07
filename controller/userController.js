const { User } = require('../models')

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
}

module.exports = userController