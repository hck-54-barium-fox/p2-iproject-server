const { decodeToken } = require("../helpers/jwt")


const auhentication = async(req, res, next)=>{
    try {
        let {access_token} = req.headers

        if (!access_token) {
            throw { code : 401, message : 'Invalid token' };
          }
        
        console.log(access_token)

        let user = decodeToken(access_token)

        console.log(user, 'INI HASIL VERIFY')
        req.customer = ({id: user.id, email : user.email})
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }

}

module.exports = auhentication