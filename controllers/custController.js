const { OAuth2Client } = require('google-auth-library')
const { compareHash, signToken } = require('../helpers/jwt')
const { User } = require('../models/index')
const {sendEmail} = require("../helpers/nodemailer")



class Controller{
    static async register(req, res, next){
        try {
            let {email, password, phoneNumber, noIdentity} = req.body
            let imagePath = req.file.path
            console.log(req.body, req.file);
            let user = await User.create({
                email,
                password,
                phoneNumber,
                noIdentity,
                image : imagePath
            })
            sendEmail(email)
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
            res.status(200).json({access_token, email})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async googleSignIn(req, res, next) {
        try {
          let token = req.headers.google_token;
          const CLIENT_ID = process.env.CLIENT_ID
          const client = new OAuth2Client(CLIENT_ID);
    
          const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
          });
          const googlePayload = ticket.getPayload();
          const [user, created] = await User.findOrCreate({
            where: { email: googlePayload.email },
            defaults: {
              email: googlePayload.email,
              password: "password",
            },
            hooks: false,
          });
    
          let payload = {
            id: user.id,
          };
    
          let access_token = signToken(payload);
          res.status(200).json({ access_token, email: user.email});
          verify().catch(console.error);
        } catch (error) {
            console.log(error);
          next(error);
        }
    }


}

module.exports = Controller