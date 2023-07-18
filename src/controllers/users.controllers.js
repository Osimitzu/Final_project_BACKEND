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

module.exports = {
  createNewUserCTRL,
  validateEmail,
};
