const {verify} = require('../helper/jwt')
const {User} = require('../models/')

const authentication = async (req, res, next) => {
    try {
        // console.log(req.headers);
        const payload = verify(req.headers.access_token)
        if(payload){
            const user = await User.findByPk(payload.id)
            if(user){
                req.user = payload
                // console.log(req.user);
                // console.log(user);
                next()
            }else{
                throw {name: 'user invalid', code: 403}
            }
        }else{
            throw {name: 'id invalid', code: 403}
        }
    } catch(err){
        next(err)
    }
}

module.exports = {authentication}