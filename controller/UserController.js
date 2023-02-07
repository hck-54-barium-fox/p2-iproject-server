const {User, Transaction} = require('../models/index')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt');

class UserController {
    static async Register (request, response) {
        try {
            let {username, email, password} = request.body
            if(!username) {
                response.status(400).json({message:'Username is required'})
                return
            }
            if(!email) {
                response.status(400).json({message:'Email is required'})
                return
            }
            if(!password) {
                response.status(400).json({message:'Password is required'})
                return
            }
            console.log(username, password, email);
            let dataRegister = await User.create({username, email, password})
            response.status(201).json(dataRegister)
        } catch (error) {
            console.log(error, 'ini di register');
            if (error.name == 'SequelizeValidationError') {
                response.status(400).json({message: error.errors[0].message})
            } else if (error.name == 'SequelizeUniqueConstraintError') {
                response.status(400).json({message: error.errors[0].message})
            } else {
                response.status(500).json({message: 'Internal Server Error'})
            }
        }
    }

    static async Login (request, response, next) {
        try {
            let { email, password } = request.body
            console.log(email, password);
            if (!email || !password) {
                // response.status(400).json('email or apssword is required')
                response.status(400).json({message: 'Email or Password is required'})
                return
            }
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                response.status(400).json({message: 'Email or Password not found'})
                return
            }
            let compares = compare(password, user.password)

            if (!compares) {
                response.status(400).json({message: 'Email or Password not found'})
                return
            }
            let payload = {
                id: user.id,
                email: user.email,
                username: user.username,
            }
            console.log(payload.username, '<<<<<<<<');
            let access_token = sign(payload)
            response.status(200).json({access_token})
        } catch (error) {
            console.log(error, 'ini di login');
            response.status(500).json({message: 'internal server error'})
        }
    }
}

module.exports = UserController