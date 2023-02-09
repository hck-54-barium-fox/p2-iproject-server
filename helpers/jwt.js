var jwt = require("jsonwebtoken");

function encodeToken(params) {
  return jwt.sign(params, "hamzah");
}

function decodeToken(token) {
  return jwt.verify(token, "hamzah");
}

module.exports = { encodeToken, decodeToken };
