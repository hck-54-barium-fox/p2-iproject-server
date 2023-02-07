const { User } = require('../models/index')
const { checkPassword } = require('../helpers/bcrypt')
const { encodedToken } = require('../helpers/jwt')
class UserController {
    static async register(request, response) {
        try {
            const {email, password} = request.body;

            const user = await User.create({
                email,
                password
            })

            response.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (err) { 
            if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
                const errorMessage = err.errors[0].message;
                response.status(400).json({
                    message: errorMessage
                })
            } else {
                response.status(500).json({
                    message: "Internal server error"
                })
            }
        }
    }

    static async login(request, response) {
        try {
            const {email, password} = request.body;

            if (!email) {
                throw { status: 400, message: "Email is required"}
            }

            if (!password) {
                throw { status: 400, message: "Password is required"}
            }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                throw { status: 401, message: "Invalid email / password"}
            }

            if (!checkPassword(password, user.password)) {
                throw { status: 401, message: "Invalid email / password"}
            }

            const access_token = encodedToken({
                id: user.id,
                email: user.email
            })

            response.status(200).json({
                access_token
            })
        } catch (err) {
            if (err.status) {
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
}



module.exports = UserController