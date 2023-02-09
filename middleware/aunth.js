const { verifyToken } = require("../helpers/jwt");
const { User, Playlist, Movies } = require('../models/index')

const authentication = async (req, res, next) => {
    try {
        let { access_token } = req.headers
        if (!access_token) {
            throw { name: "InvalidToken" };
        }

        const decoded = verifyToken(access_token)
        const user = await User.findByPk(decoded.id)
        if(!user){
            throw { name: "InvalidToken" };
        }

        req.userLogin = {
            id : user.id
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {authentication}