const { User } = require("../models/index")
const { compare } = require("../helpers/bcrypt")
const { sign } = require("../helpers/jwt")
const axios = require('axios')
const url = 'https://makeup-api.herokuapp.com/api/v1/products.json'
// const { OAuth2Client } = require('google-auth-library');

class Controller {
    static async register(req, res, next) {
       
        try {
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            })
            res.status(201).json({
                message: "Input data User succeed",
                id: user.id,
                email: user.email
            })
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            let user = await User.findOne({
                where: { email }
            })
            if (!user || !compare(password, user.password)) {
                throw { name: "Invalid login" }
            } else {
                const { id, email } = user
                let token = sign({
                    id,
                    email
                })
                res.status(200).json({
                    access_token: token,
                })
            }

        } catch (err) {
            next(err)
        }
    }
    
    static async fetchProducts(req, res, next){
        try{
            const { data } = await axios({
                methods:'GET',
                url: `${url}`,
            })
            
            res.status(200).json(data)
        }
        catch(err){
            console.log(err)
        }
    }
    // static async googleOAuth(req, res, next) {
        
    //     try {
    //         // const { google_token } = req.headers
    //         const client = new OAuth2Client(process.env.CLIENT_ID)
    //         const ticket = await client.verifyIdToken({
    //             idToken: req.body.idToken,
    //             audience: process.env.CLIENT_ID
    //         })
    //         const payload = ticket.getPayload()
    //         // console.log(payload);
    //         const { email, name } = payload
    //         const [user, create] = await User.findOrCreate({
    //             where: {
    //                 email
    //             },
    //             defaults: {
    //                 username: name,
    //                 email,
    //                 password: "rahasia",
    //                 role: 'staff',
    //                 address: 'jln. Kemang Raya',
    //                 phoneNumber: '0811924648'
    //             },
    //             hooks: false
    //         })
    //         let access_token = sign({
    //             id: user.id
    //         })
    //         res.status(200).json({ access_token, username: user.username, id: user.id })
    //     } catch (err) {
    //         next(err)
    //     }
    // }
}



module.exports = Controller