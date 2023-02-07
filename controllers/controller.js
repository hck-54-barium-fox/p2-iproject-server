const { compareHash, signToken } = require('../helpers/jwt')
const {User} = require('../models/index')


class Controller{
    static async register(req, res, next){
        try {
            let {email, password} = req.body
            let user = await User.create({
                email,
                password
            })
            res.status(201).json(user)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async login(req, res, next){
        try {
            let {email, password} = req.body
            if(!email){
                throw ({ name: 'BadRequest' })
            }
            if(!password){
                throw ({ name: 'BadRequest' })
            }
            let user = await User.findOne({
                where : {email}
            })
            if(!user){
                throw ({ name: 'InvalidCredentials' })
            }
            let compare = compareHash(password, user.password)
            if(!compare){
                throw ({ name: 'InvalidCredentials' })
            }
            let payload = {
                id: user.id
            }
            let access_token = signToken(payload.id)
            res.status(200).json({access_token})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }



}

module.exports = Controller