const {User} = require('../models/index');
const {hashPassword, comparePassword} = require('../helpers/bcrypt');
const {signToken, decodeToken} = require('../helpers/jwt');


class UserController {
    static async register(req,res){
        try {
            const { email,password } = req.body
            if(!email){
                throw {status:400,message:'Email is required'}
            }
            if(!password){
                throw {status:400,message:'Password is required'}
            }
            const dataUser = await User.create({email, password:hashPassword(password)})

            res.status(200).json({id:dataUser.id, email:email})
            
        } catch (error) {
            console.log(error);
            if(error.status){
                res.status(res.status).json({message: error.message})
            }else{
                res.status(500).json({message: 'Internal server error'})
            }
        }
    }
}

module.exports = UserController