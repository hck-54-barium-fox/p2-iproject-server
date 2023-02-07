const { Customer, Shoe, Cart, Transaction } = require('../models')
const { compare, sign } = require('../helpers/helper')

class Controller {
    static async register(req, res, next) {
        try {
            const { email, password, name } = req.body
            let cust = await Customer.create({ email, password, name })
            res.status(201).json({
                id: cust.id,
                email: cust.email
            })
        } catch (err) {
            if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ message: err.errors[0].message })
            }
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) {
                throw { status: 400, msg: "Email is required" }
            }

            if (!password) {
                throw { status: 400, msg: "Password is required" }
            }

            let user = await Customer.findOne({ where: { email } })

            if (!user) {
                res.status(401).json({ message: "Invalid email/password" })
            } else {
                let isPasswordValid = compare(password, user.password)

                if (!isPasswordValid) {
                    res.status(401).json({ message: "Invalid email/password" })
                } else {
                    const { id, email } = user
                    let token = sign({ id, email })
                    res.status(200).json({ access_token: token })
                }
            }

        } catch (err) {
            if (err.msg) {
                res.status(err.status).json({ message: err.msg });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }

}

module.exports = Controller