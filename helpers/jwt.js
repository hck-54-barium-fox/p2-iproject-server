const jwt = require("jsonwebtoken");

function signToken(value) {
  const token = jwt.sign(value, process.env.SECRET);
  return token;
}

function decodeToken(value) {
  return jwt.verify(value, process.env.SECRET);
}

module.exports = { signToken, decodeToken };
