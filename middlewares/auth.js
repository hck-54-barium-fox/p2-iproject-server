const {decodedToken} = require('../helpers/jwt')
const { User } = require('../models/index')

const authentication = async (request, response, next) => {
    try {
        const {access_token} = request.headers;
        if (!access_token) {
            throw { status: 401, message: "Invalid token"}
        }

        const payload = decodedToken(access_token)

        const user = await User.findByPk(payload.id)

        if (!user) {
            throw { status: 401, message: "Invalid token"}
        }
        
        request.user = user
        console.log(request.user, '<<<')
        next()
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            response.status(401).json({
                message: "Invalid token"
            })
        } else if (err.status) {
            response.status(err.status).json({
                message: err.message
            })
        } else {
            response.status(500).json({
                message: "Internal server error"
            })
        }
    }
}

module.exports = authentication