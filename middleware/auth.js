const { Customer, Product } = require("../models")
const { decode } = require("../helper/jwt")

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers

        if (!access_token) {
            throw {
                name: "InvalidToken"
            }
        }

        const data = decode(access_token)
        const dataUser = await Customer.findByPk(data.id)

        if (!dataUser) {
            throw {
                name: "InvalidToken"
            }
        }

        req.user = {
            id: dataUser.id,
            email: dataUser.email,
            role: dataUser.role
        }
        next()
    } catch (err) {
        console.log(err, "at authentication");
        next(err)
    }
}


async function authorization(req, res, next) {
    try {
        const id = req.params.id

        const data = await Product.findByPk(id)
        let { id: userId, email } = req.user

        if (!data) {
            throw { name: "NotFound" }
        }

        if (data.id === userId) {
            next()
        } else {
            throw { name: "Forbidden" };
        }
    } catch (err) {
        console.log(err, "at authorization");
        next(err)
    }
}

module.exports = {authentication, authorization}