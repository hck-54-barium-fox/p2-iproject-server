const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt.js');
const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    
    console.log('masuk sini gak?', access_token);
    if (!access_token) {
      throw { name: 'unauth' };
    }
    const getPayload = verifyToken(access_token);
    const user = await User.findByPk(getPayload.id);
    if (!user) {
      throw { name: 'unauth' };
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'unauth') {
      res.status(401).json({ message: 'invalid token' });
    } else {
      res.status(500).json({ message: 'internal server error' });
    }
  }
};

const authorization = async (req, res, next) => {
  try {
    if (!req.user.verified) {
      throw { name: 'forbidden' };
    }
    next();
  } catch (err) {
    if (err.name === 'forbidden') {
      res.status(403).json({ message: 'Please activate your acount' });
    }
  }
};

module.exports = {
  authentication,
  authorization,
};
