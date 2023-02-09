const { decodeToken } = require('../helpers/jwt');
const {User, Letter} = require('../models')
const authentication = async (req, res, next) => {
    try {
      const { access_token } = req.headers;
      if (!access_token) {
        throw { name: "loginFirst" };
      }
  
      const checkToken = decodeToken(access_token);
      if (!checkToken) {
        throw { name: "Invalid token" };
      }
      const { id } = checkToken;
      const user = await User.findByPk(id);
      if (!user) {
        throw { name: "Invalid token" };
      }
      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };

  const authorization = async (req, res, next)=>{
    try {
      const {letterId} = req.params
      const letter = await Letter.findByPk(letterId);
      if (!letter) {
        throw { name: "notFound" };
      }

      if(letter.UserId !== req.user.id){
        throw { name : "forbidden"}
      }
      next()
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
  module.exports = {
    authentication,
    authorization
  }