const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bycriptjs')
const { createToken } = require('../helpers/jwt')
class userController{
    static async userRegister(req, res, next){
        try {
            const user = await User.create({
                email : req.body.email,
                password : req.body.password,
                phoneNumber : req.body.phoneNumber
            })
            res.status(200).json({id : user.id, email : user.email})
        } catch (error) {
            next(error)
        }
    }

    static async userLogin(req, res, next){
        try {
            let { email, password } = req.body
        if(!email){
            throw {name : "badRequestEmail"}
        }
        if(!password){
            throw {name : "badRequestPassword"}
        }
        const user = await User.findOne({ where : {email}})
        if(!user){
            throw {name : "Unauthorized"}
        }
        const compare = comparePassword(password, user.password)
        if(!compare){
            throw {name : "Unauthorized"}
        }
        const token = createToken({ id : user.id})
        console.log(token);
        res.status(200).json({access_token : token})

        } catch (error) {
            next(error)
        }
        
    }
}

module.exports = userController