const { decodeToken } = require("../helpers/jwt")
const {User} = require("../models/index")
let authentication = async (req,res,next)=>{
    try {
        const{access_token} = req.headers
        if(!access_token){
            throw({status:401,message:"Invalid token"})
        }
        let decodedToken = decodeToken(access_token)
        let user = await User.findByPk(decodedToken.id)
        if(!user){
            throw({status:401,message:"Invalid token"})
        }
        req.user = user
        next()
    } catch (err) {
        if(err.status){
            res.status(401).json({message:err.message})
        }else if (err.name === 'JsonWebTokenError'){
            res.status(401).json({message:"Invalid token"})
        }else{
            res.statuas(500).json({message:"Internal server error"})
        }
    }
}


module.exports = {authentication}