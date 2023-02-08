const { decodeToken } = require("../helpers/jwt");
const {User} = require('../models/index');

const authentication = async (req, res, next) => {
    try {
        const {access_token} = req.headers
        if(!access_token){
            throw {status: 401, message: 'Invalid Token'}
        }
        const data = decodeToken(access_token)
        console.log(data);
        const user = await User.findOne({where:{id:data}})
        
        if(!user){
            throw {status: 401, message: 'Invalid Token'}
        }

        req.user = user

        next()
    } catch (error) {
        console.log(error);
        if(error.status) {
            res.status(error.status).json({message: error.message})
        }else{
            res.status(500).json({message: 'Internal server error'})
        }
    }
} 


module.exports = authentication