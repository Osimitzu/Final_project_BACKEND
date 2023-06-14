const { users } = require("../models");

const createNewUserREPO = async (newUser) => {
  const user = await users.create(newUser);
  return user;
};

module.exports = {
  createNewUserREPO,
};
