const { decodeToken } = require("./jwt")
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw { name: "invalid token" }
        }
        const data = decodeToken(access_token)
        const user = await User.findByPk(data.id)
        if (!user) {
            throw { name: 'invalid token' }
        }
        req.user = user;
        next()
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = authentication

