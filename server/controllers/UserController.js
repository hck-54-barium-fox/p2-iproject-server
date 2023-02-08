const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const {User} = require("../models/index")
class UserController{

    static async registerUser(req,res){
        try {
            const {username,email,password} = req.body
            let newUser = await User.create({
                username,email,password
            })
            res.status(201).json(newUser)
        } catch (err) {
            if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
                res.status(400).json({message:err.errors[0].message})
            }else{
                res.status(500).json(err)
            }
        }
    }
    static async loginUser(req,res){
        try {
            const{email,password} = req.body
            let user = await User.findOne({
                where:{
                    email
                }
            })
            if(!user){
                throw({status:400,message:"Invalid email/password"})
            }
            let comparedPassword = comparePassword(password,user.password)
            if(!comparedPassword){
                throw({status:400,message:"Invalid email/password"})
            }
            let access_token = signToken({
                id:user.id,
                email:user.email
            })
            res.status(200).json({access_token})
        } catch (err) {
            console.log(err)
            if(err.status){
                res.status(err.status).json({message:err.message})
            }else{
                res.status(500).json({message:"Internal server error"})
            }
        }
    }
}

module.exports = UserController