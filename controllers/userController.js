const { User } = require('../models/index')
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
        
    }
}

module.exports = userController