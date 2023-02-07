const jwt = require('jsonwebtoken');
const secret = 'yoursecretkey';

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, secret, { expiresIn: '10m' });
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = {
  generateToken,
  verifyToken,
};
