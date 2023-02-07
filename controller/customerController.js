const {Customer, Bookmark, Product} = require("../models")
const { comparePassword } = require("../helper/bcrypt")
const { sign } = require("../helper/jwt")
// const { OAuth2Client } = require("google-auth-library");
const { Op } = require("sequelize");

class CustomerController {
    static async register(req, res, next){
        try {
            const {email, password, username} = req.body
            const data = await Customer.create({email, password, username})
            // console.log(data, ">>");
            res.status(201).json(data)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = CustomerController