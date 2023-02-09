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
    static async googleLogin(req, res, next) {
        try {
          const oAuth2Client = new OAuth2Client(process.env.CLIENT_ID);
    
          const result = await oAuth2Client.verifyIdToken({
            idToken: req.body.idToken,
            expectedAudience: process.env.CLIENT_ID,
          });
    
          const payload = await result.getPayload();
          let [created] = await Customer.findOrCreate({
            where: { email: payload.email },
            defaults: {
              email: payload.email,
              password: "google-login",
              role: "customer",
            },
            hooks: false,
          });
    
          let token = createToken({
            id: created.id,
          });
    
          res
            .status(200)
            .json({ access_token: token, username: payload.given_name });
        } catch (err) {
          next(err);
        }
      }
}

module.exports = userController