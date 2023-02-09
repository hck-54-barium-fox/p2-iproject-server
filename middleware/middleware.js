const { decodepayload } = require('../helpers/jwt')
const { Player, User, Transaction } = require('../models')

async function authentication(request, response, next) {
    try {
        console.log(request.headers, '<<<<');
        let { access_token } = request.headers
        if (!access_token) {
            console.log('test')
            // throw {name: "unauthenticated"}
            response.status(401).json({ message: 'Invalid Token' })
            return
        }
        let payload = decodepayload(access_token)
        let dataUser = await User.findByPk(payload.id)
        if (!dataUser) {
            // console.log('test2');
            // throw {name: "unauthenticated"}
            console.log('ini masuk ye');
            // throw new ErrorClass(403, "You must login first")
            response.status(401).json({ message: 'Invalid Token' })
            return
        }
        request.user = { id: dataUser.id, email: dataUser.email, username: dataUser.username }
        next()

    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            response.status(401).json({ messsage: `Invalid Token` })
        } else {
            response.status(500).json({ message: `Internal server error` })
        }

    }
}

async function authorization(request, response, next) {
    try {
        let id = request.user.id
        let userLogin = await User.findByPk(id)
        if (!userLogin) {
            response.status(403).json({ message: 'Not Authorized' })
            return
        }
        if (userLogin.status == 'member') {
            response.status(403).json({ message: 'Not Authorized' })
            return
        } else if (userLogin.status == 'premium') {
            next()
        } else {
            response.status(403).json({ message: 'Not Authorized' })
            return
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Internal Server error' })
    }
}

module.exports = { authentication, authorization }