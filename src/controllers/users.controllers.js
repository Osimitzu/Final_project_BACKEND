const usersServices = require("../services/users.services");
const jwt = require("jsonwebtoken");
const { users } = require("../models");
require("dotenv").config();

const createNewUserCTRL = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    await usersServices.createNewUserSRVC(username, email, password);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
};

const validateEmail = async (req, res, next) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_EMAIL_VALIDATION, {
      algorithms: "HS512",
    });

    if (!decoded) {
      next({
        status: 400,
        name: "verification error",
        message: "something occurred during verification, please request again",
      });
    }

    await users.update(
      { valid_user: true },
      {
        where: { email: decoded.email },
      }
    );

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const loginCTRL = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await usersServices.loginSRVC(email, password);
    res.json(userData);
  } catch (err) {
    next(err);
  }
};

// Delete user controller v1
// const deleteUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const user = await users.findOne({
//       where: { id },
//     });

//     if (!user) {
//       next({
//         status: 400,
//         name: "Invalid user",
//         message: "User doesn't exist",
//       });
//     }

//     await cars.destroy({
//       where: { user_id: id },
//     });

//     await users.destroy({
//       where: { id },
//     });

//     res.status(201).send("User deleted");
//   } catch (err) {
//     next(err);
//   }
// };

const deleteUserCTRL = async (req, res, next) => {
  try {
    const { id } = req.params;
    await usersServices.deleteUserSRVC(id);
    res.status(201).send("User deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNewUserCTRL,
  validateEmail,
  loginCTRL,
  deleteUserCTRL,
};
