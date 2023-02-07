const { User } = require('../models/index')

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
}



module.exports = UserController