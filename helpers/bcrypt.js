const bcrypt = require("bcryptjs");

function hashPass(pass) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(pass, salt);
  return hash;
}

function comparePass(pass, hash) {
  return bcrypt.compareSync(pass, hash);
}

module.exports = {
  hashPass,
  comparePass,
};
