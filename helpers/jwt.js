const jwt = require('jsonwebtoken');
const createToken = (data) => {
   return jwt.sign(data, process.env.SECRET_KEY_JWT);
} 
// var decoded = jwt.verify(token, 'shhhhh');

const verifyToken = (token) => {
   return jwt.verify(token, process.env.SECRET_KEY_JWT);
}

module.exports = { createToken, verifyToken }