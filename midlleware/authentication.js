const {User} = require('../models')
const {sign,verify} = require('../helper/jwt')

const authentication = async (req,res,next) =>{
  try {
    const {access_token} = req.headers
    // console.log(req.headers,'<<<,');
    if(!access_token) {
        throw {name: 'inavalidToken'}
    }

    const data = verify(access_token)
    // console.log(data);
    const user = await User.findByPk(data.id)
    if(!user) {
        throw {status : 401, name : 'inavalidToken'}
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication