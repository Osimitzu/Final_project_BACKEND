const usersServices = require("../services/users.services");

const createNewUserCTRL = async (req, res, next) => {
  try {
    const user = req.body;
    await usersServices.createNewUserSRVC(user);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNewUserCTRL,
};
