const DataParseUri = require('datauri/parser')
const { Customer, Bookmark, Product } = require("../models")
const { comparePassword } = require("../helper/bcrypt")
const { sign } = require("../helper/jwt")
const cloudinary = require("../middleware/cloudinary");
// const { OAuth2Client } = require("google-auth-library");
const { Op } = require("sequelize");

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
            const { email, password } = req.body
            if (!email || !password) {
                throw {
                    name: "InvalidLogin"
                }
            }

            let data = await Customer.findOne({
                where : {
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
            let token = sign({ id })
            res.status(200).json({ token })
        } catch (err) {
            next(err)
        }
    }

    static async myProfile(req, res, next) {
        try {
            const customerId = req.customer.id;
            const user = await Customer.findByPk(customerId, {
                attributes: { exclude: ['password'] }
            })
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }

    static async updateProfile(req, res, next) {
        try {
            const { id, username, email, phoneNumber } = req.body
            let payload = { id, username, email, phoneNumber }

            if (req.file) {
                const parser = new DataParseUri()
                const pathImage = parser.format(req.file.originalname, req.file.buffer)
                const resCloud = await cloudinary.uploader.upload(pathImage.content)

                const img_profile = resCloud.secure_url
                payload = {
                    ...payload,
                    address: img_profile
                }

                const updateCustomer = await Customer.update(payload, {
                    where: { id }
                })

                res.status(200).json(updateCustomer)
            } else {
                const updateCustomer = await Customer.update(payload, {
                    where: { id }
                })

                res.status(200).json(updateCustomer)
            }

        } catch (err) {
            next(err)
        }
    }

module.exports = CustomerController
