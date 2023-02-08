const { Customer, Bookmark, Product } = require("../models")
const { comparePassword } = require("../helper/bcrypt")
const { sign } = require("../helper/jwt")
// const { OAuth2Client } = require("google-auth-library");

class CustomerController {
    static async register(req, res, next) {
        try {
            const { email, password, username } = req.body
            const data = await Customer.create({ email, password, username })
            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password, username } = req.body
            if (!email || !password || !username) {
                throw {
                    name: "InvalidLogin"
                }
            }

            let data = await Customer.findOne({
                where: {
                    email
                }
            })

            if (!data) {
                throw {
                    name: "InvalidLogin"
                }
            }

            let checkPassword = comparePassword(password, data.password)
            if (!checkPassword) {
                throw {
                    name: "InvalidLogin"
                }
            }
            let { id } = data
            let token = sign({id})
            res.status(200).json({token})
        } catch (err) {
            next(err)
        }
    }

    static async loginByFacebook(req, res, next) {

    }

}

module.exports = CustomerController
