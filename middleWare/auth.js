const { decodeToken } = require("../helpers/jwt")
const { User, Event } = require('../models/index')

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

const authorization = async (req, res, next) => {
    try {
        const { eventId } = req.params
        console.log(req.user)
        const event = await Event.findByPk(eventId)
        console.log(event)
        if (!event) {
            throw { message: "data not found" }
        }
        if (req.user.id !== event.UserId) {
            throw { message: "forbidden to access" }
        }

        next()
    } catch (error) {
        next(error)
    }
}




module.exports = { authentication, authorization }