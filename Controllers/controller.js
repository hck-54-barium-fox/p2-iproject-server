const { compare } = require('../middleware/bcrypt')
const { createToken } = require('../middleware/jwt')
const { User, Trainer } = require('../models/index')
const axios = require("axios");

class Controller {
    static async register(req, res) {
        try {
            const { name, email, password, height, weight } = req.body
            User.create({ name, email, password, height, weight })
            res.status(200).json({
                message: "Anda berhasil daftar baginda"
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            let user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                throw { msg: "Invalid email/password" }
            } else {
                let compareResult = compare(password, user.password)
                if (!compareResult) {
                    throw { msg: "Invalid email/password" }
                } else {
                    const { id, email, username } = user
                    let token = createToken({
                        id,
                        email
                    })
                    res.status(200).json({ token, username })
                }
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    
}


module.exports = Controller