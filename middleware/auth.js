const { Customer, Product } = require("../models")
const { decode } = require("../helper/jwt")

async function custAuthentication(req, res, next) {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw {
                name: "InvalidToken"
            }
        }

        const data = decode(access_token)
        const dataCust = await Customer.findByPk(data.id)
        if (!dataCust) {
            throw {
                name: "InvalidToken"
            }
        }

        req.customer = {
            id: dataCust.id,
            email: dataCust.email,
            role: dataCust.role
        }
        next()
    } catch (err) {
        next(err)
    }
}
module.exports = { custAuthentication }