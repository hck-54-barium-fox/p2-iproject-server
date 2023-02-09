const { decodeToken } = require("../helpers/jwt")
const { User } = require('../models/index')

const authentication = async (req, res, next) => {
    try {
        // console.log(req.headers)
        const { access_token } = req.headers;
        if (!access_token) {
            throw { message: "invalid token" }
        }
        const data = decodeToken(access_token);
        const user = await User.findByPk(data.id);
        // console.log(user)
        if (!user) {
            throw { message: 'invalid token' }
        }

        req.user = user;

        next()
    } catch (error) {
        next(error)
    }
}




module.exports = { authentication }