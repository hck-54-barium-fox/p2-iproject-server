const { decodeToken } = require('../helpers/jwt');
const { User, Event } = require('../models');
// bikin author dengan variabel
const authorization = async (req, res, next) => {
    try {
        const { id } = req.params
        // cari yg ga adal
        const dataEvent = await Event.findByPk(id)
        if (!dataEvent) {
            throw { name: " Data Not Found" }
        } else {
            if (req.user.role === 'admin') {
                next()
            } else {
                if (req.user.id === dataEvent.authorId) {
                    next()
                } else {
                    throw {
                        name: 'Forbidden'
                    }
                }
            }
        }
    } catch (error) {
        next(error)
    }
}

const authentication = async (req, res, next) => {
    try {
        const  {access_token}  = req.headers
        console.log(access_token, '<<<<<<<<<<<<<<');
        
        if (!access_token) {
            throw { name: 'Unauthorized' }
        }

        let payload = decodeToken(access_token)
        let user = await User.findByPk(payload.id)
        if (!user) {
            throw { name: 'Unauthorized' }
        }
        req.user = { id: user.id, email: user.email, role: user.role }
        next()
    } catch (error) {
        next(error)
    }
}



module.exports = { authentication, authorization }