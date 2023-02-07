const bcrypt = require("bcryptjs");

const hash = (password) => {
  console.log(password);
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const compare = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
  hash,
  compare,
};
