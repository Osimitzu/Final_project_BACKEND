const usersServices = require("../services/users.services");
const jwt = require("jsonwebtoken");
const { users } = require("../models");
require("dotenv").config();
const bcrypt = require("bcrypt"); //temporal

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

// const loginCTRL = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await users.findOne({
//       where: { email },
//     });

//     if (!user) {
//       return next({
//         status: 400,
//         name: "Invalid email",
//         message: "email doesn't exists",
//       });
//     }

//     if (!user.valid_user) {
//       return next({
//         status: 400,
//         name: "Email is not verified",
//         message: "user has not verified his email",
//       });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);

//     if (!validPassword) {
//       return next({
//         status: 400,
//         name: "Invalid password",
//         message: "Your password doesn't match with user email",
//       });
//     }

//     const { id, username, avatar, role_id } = user;

//     const userData = { id, username, email, password, avatar, role_id };

//     const token = jwt.sign(userData, process.env.JWT_SECRET_LOGIN, {
//       algorithm: "HS512",
//       expiresIn: "5m",
//     });

//     userData.token = token;

//     res.json(userData);
//   } catch (err) {
//     next(err);
//   }
// };

const loginCTRL = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await usersServices.loginSRVC(email, password);
    res.json(userData);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNewUserCTRL,
  validateEmail,
  loginCTRL,
};
