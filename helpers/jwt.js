const jwt = require("jsonwebtoken");

function signToken(value) {
  const token = jwt.sign(value, process.env.JWT_SECRET_KEY);
  return token;
}

function decodeToken(value) {
  return jwt.verify(value, process.env.JWT_SECRET_KEY);
}

module.exports = { signToken, decodeToken };
