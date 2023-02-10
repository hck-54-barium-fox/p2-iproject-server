const { checkPassword } = require('../helpers/bcrypt')
const { encodeToken } = require('../helpers/jwt')
const { User } = require('../models/index')
const { OAuth2Client } = require('google-auth-library');


class ControllerAuth {
    static async register(req, res, next) {
        try {
            console.log(req.body)
            const {username, email, password } = req.body
            const regisUser = await User.create({username, email, password })
            res.status(201).json({ id: regisUser.id, email: regisUser.email })
        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next) {
        try {
            console.log(req.body)
            const { email, password } = req.body
            if (!email) {
                throw { message: "Email is required" }
            }
            if (!password) {
                throw { message: "Password is required" }
            }
            const dataUser = await User.findOne({ where: { email } })

            if (!dataUser) {
                throw { message: 'Invalid email/password' }
            } else {
                const isValidPassword = checkPassword(password, dataUser.password)

                if (!isValidPassword) {
                    throw { message: 'Invalid email/password' }
                } else {
                    const { id, email } = dataUser
                    const access_token = encodeToken({ id, email })
                    res.status(200).json({ access_token })
                }
            }
        } catch (error) {
            next(error)
        }
    }
    static async loginUserGoogle(req, res, next) {
        try {
            // console.log(req.body)
            const CLIENT_ID = process.env.CLIENT_ID_GOOGLE
            const token = req.body.google_token
            const client = new OAuth2Client(CLIENT_ID);
            console.log({ CLIENT_ID, token }, `masukkk siniiiiiiiiiiiiiiiiiiiiiiiiiii`)
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            console.log(payload)
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.given_name,
                    email: payload.email,
                    password: 'googleUser',
                    role: 'User'
                },
                hooks: false
            })
            console.log(user)
            const { id, email } = user
            const username = user.username
            const access_token = encodeToken({ id, email })
            res.status(201).json({ access_token })
        }
        catch (error) {
            next(error)
        }
    }
    static async loginUserFacebook(req, res, next) {
        try {
            const { response } = req.body
            console.log(response)
            const [user, created] = await User.findOrCreate({
                where: {
                    email: response.email
                },
                defaults: {
                    username: response.name,
                    email: response.email,
                    password: 'facebookUser',
                },
                hooks: false
            })
            const { id, email } = user
            const username = user.username
            const access_token = encodeToken({ id, email })
            res.status(201).json({ access_token })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerAuth