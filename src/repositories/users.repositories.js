const { users, cars } = require("../models");

const createNewUserREPO = async (newUser) => {
  const user = await users.create(newUser);
  const car = await cars.create({ user_id: user.id });
  return { user, car };
};

module.exports = {
  createNewUserREPO,
};
