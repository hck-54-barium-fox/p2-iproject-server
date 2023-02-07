const{User,Category,Product} = require('../models/index')
const {compare} = require('../helper/byrpt')
const {sign} = require('../helper/jwt')
const sendEmail = require('../helper/nodemailer')
// const { send } = require('vite')
class Controller {
    static async register(req,res,next) {
        try {
            const{username,password,email,city} = req.body
            const data = await User.create({
                username,
                email,
                password,
                city
            })
          sendEmail(email)
          res.status(201).json({
            message : data
        })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static async Login(req,res) {
        try {
            const {email,password} = req.body
            const user = await User.findOne({
                where : {
                    email
                },  
            }) 
            if(!user) {
                throw {
                    name : 'invalid login'
                }
            } else {
                let comparePassword = compare(password,user.password)
                if(!comparePassword) {
                    throw {
                        name : 'invalid login'
                    }
                } else {
                    let {id,email} = user
                    let token = sign({
                        id,
                        email
                    })
                    res.status(201).json({
                        access_token : token,
                        user
                    })
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller