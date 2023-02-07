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

}

module.exports = Controller