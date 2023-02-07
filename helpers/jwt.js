const jwt = require('jsonwebtoken');
const createToken = (data) => {
   return jwt.sign(data, 'shhhhh');
} 

module.exports = { createToken }