const{User,Category,Product} = require('../models/index')
const {compare} = require('../helper/byrpt')
const {sign} = require('../helper/jwt')
const sendEmail = require('../helper/nodemailer')
const {OAuth2Client} = require('google-auth-library');
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
    static async Login(req,res,next) {
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
            console.log(error,'darii login');
            next(error)
        }
    }
    static async googleLogin(req,res,next) {
        try {
            // const {google_token} = req.headers 
            // console.log(google_token);
        
        const client = new OAuth2Client(process.env.CLIENT_ID)
        const ticket = await client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.CLIENT_ID
        })
        const payload = ticket.getPayload()
        console.log(payload);
        const {email, name} = payload
        const [user, create] = await User.findOrCreate({
            where: {
                email
            },
            defaults: {
                username: name,
                email,
                password: "secret",
                role: 'user',
                city: 'jekardeh',
                phoneNumber: '098765432'
            },
            hooks: false
        })
        console.log(user);
        const access_token = sign({
            id: user.id
        })
        console.log(access_token,'ini access token');
        console.log(user.username);
        res.status(200).json({access_token, username: user.username, id:user.id,role:user.role})
        } catch (error) {
            console.log(error);
            next()
        }
    }
}

module.exports = Controller