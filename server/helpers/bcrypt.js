const bcrypt = require("bcryptjs");

const hashPass = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePass = (password, hash) => {
  const comparing = bcrypt.compareSync(password, hash);

  return comparing;
};

module.exports = { hashPass, comparePass };
