const { users, cars } = require("../models");

const createNewUserREPO = async (newUser) => {
  // Crea un nuevo usuario en la base de datos utilizando los datos proporcionados
  const user = await users.create(newUser);

  // Crea un nuevo registro de automóvil asociado al usuario recién creado
  const car = await cars.create({ user_id: user.id });

  // Retorna un objeto que contiene tanto el usuario como el registro de automóvil
  return { user, car };
};

const deleteUserREPO = async (id) => {
  // Elimina todos los registros de automóviles asociados al usuario con el ID proporcionado
  await cars.destroy({
    where: { user_id: id },
  });

  // Elimina el usuario con el ID proporcionado
  await users.destroy({
    where: { id },
  });
};

const updateRoleREPO = async (id, role_id) => {
  // Actualiza el rol del usuario con el ID proporcionado en la base de datos
  await users.update(
    { role_id },
    {
      where: { id },
    }
  );
};

const updateUserInfoREPO = async (id, username, avatar) => {
  // Actualiza el nombre de usuario y el avatar del usuario con el ID proporcionado en la base de datos
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
  // Busca al usuario en la base de datos utilizando el correo electrónico proporcionado
  const user = await users.findOne({
    where: { email },
  });

  // Retorna el usuario encontrado (o null si no se encuentra) para su uso posterior
  return user;
};

module.exports = {
  createNewUserREPO,
  deleteUserREPO,
  updateRoleREPO,
  updateUserInfoREPO,
  passwordResetREPO,
};
