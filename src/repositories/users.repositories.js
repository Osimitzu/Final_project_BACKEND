const { users, cars } = require("../models");

const createNewUserREPO = async (newUser) => {
  const user = await users.create(newUser);
  const car = await cars.create({ user_id: user.id });
  return { user, car };
};

const deleteUserREPO = async (id) => {
  const user = await users.findOne({
    where: { id },
  });

  if (!user) {
    throw {
      status: 400,
      name: "Invalid user",
      message: "User doesn't exist",
    };
  }

  await cars.destroy({
    where: { user_id: id },
  });

  await users.destroy({
    where: { id },
  });
};

module.exports = {
  createNewUserREPO,
  deleteUserREPO,
};
