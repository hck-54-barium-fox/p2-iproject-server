const jwt = require('jsonwebtoken');
const createToken = (data) => {
   return jwt.sign(data, 'shhhhh');
} 
// var decoded = jwt.verify(token, 'shhhhh');

const verifyToken = () => {
   return jwt.verify(token, 'shhhhh');
}

module.exports = { createToken }