const { decodeToken } = require('../helper/jwt')
const { User, myWeapon } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw { code: 401, message: "Invalid token" }
        }
        const data = decodeToken(access_token)
        const user = await User.findByPk(data.id)
        if (!user) {
            throw { code: 401, message: "Invalid token" }
        }
        req.user = user
        next()

    } catch (err) {
        if (err.code) {
            res.status(err.code).json({ message: err.message })
        } else {
            res.status(500).json({ message: "Internal server error" })
        }
    }

}

module.exports = { authentication }