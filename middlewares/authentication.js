const {decode} = require("../helpers/jwt")
const {User} = require("../models")

async function authentication(req, res, next){
    try{
        const {access_token} = req.headers
        if(!access_token){
            throw{name: "Invalid token"}
        }
        const data = decode(access_token)
        const user = await User.findByPk(data.id)
        
        if(!user){
            throw {name: "Invalid token"}
        }
        req.user = user
        next()
    }
    catch(err){
        next(err)
    }
}


module.exports= authentication