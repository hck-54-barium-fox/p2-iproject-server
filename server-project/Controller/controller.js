const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");

class Controller {

    static async register(req, res) {
        try {
            let { email, password, username } = req.body
            let dataRegister = await User.create({
                email,
                password,
                username
            })
            let dataResult = {
                id: dataRegister.id,
                email: dataRegister.email,
                username: dataRegister, username
            }
            res.status(200).json(dataResult)
        } catch (err) {
            if (err.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ message: err.errors[0].message })
            } else if (err.name === "SequelizeValidationError") {
                res.status(400).json({ message: err.errors[0].message })
            } else {
                res.status(500).json({ message: "Internal server error" ,err})
            }
        }
    }

    static async login(req, res) {
        try {
            let { email, password } = req.body
            if (!email) {
                throw ({ name: "Email is required" })
            }

            if (!password) {
                throw ({ name: "Password is required" })
            }
            let dataLogin = await User.findOne({
                where: {
                    email
                }
            })
            
            if (!dataLogin) {
                throw ({ name: "Invalid email/password" })
            }

            if (!comparePassword(password, dataLogin.password)) {
                throw ({ name: "Invalid email/password" })
            }

            let access_token = signToken({ id: dataLogin.id, email: dataLogin.email })

            res.status(200).json({ access_token })
        } catch (err) {
            if (err.name === "Invalid email/password") {
                res.status(401).json({ message: err.name })
            } else if (err.name) {
                res.status(400).json({ message: err.name })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }

}
module.exports = Controller