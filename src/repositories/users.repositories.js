const { users, cars } = require("../models");

const createNewUserREPO = async (newUser) => {
  const user = await users.create(newUser);
  const car = await cars.create({ user_id: user.id });
  return { user, car };
};

const deleteUserREPO = async (id) => {
  await cars.destroy({
    where: { user_id: id },
  });

  await users.destroy({
    where: { id },
  });
};

const updateRoleREPO = async (id, role_id) => {
  await users.update(
    { role_id },
    {
      where: { id },
    }
  );
};

const updateUserInfoREPO = async (id, username, avatar) => {
  await users.update(
    {
      username,
      avatar,
    },
    {
      where: { id },
    }
  );
};

const passwordResetREPO = async (email) => {
  const user = await users.findOne({
    where: { email },
  });
  return user;
};

module.exports = {
  createNewUserREPO,
  deleteUserREPO,
  updateRoleREPO,
  updateUserInfoREPO,
  passwordResetREPO,
};
