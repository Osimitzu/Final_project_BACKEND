const { check } = require("express-validator");
const validateResult = require("../utils/validate");

const createUserValidator = [
  check("username", "username error")
    .exists()
    .withMessage("username is mandatory")
    .notEmpty()
    .withMessage("username can't be empty")
    .isString()
    .withMessage("username must be string")
    .isLength({ min: 6, max: 30 })
    .withMessage("username must have minimum 6 characters and max 30"),
  check("email", "email error")
    .exists()
    .withMessage("email is mandatory")
    .notEmpty()
    .withMessage("email can't be empty")
    .isString()
    .withMessage("email must be string")
    .isEmail()
    .withMessage("email must have right format")
    .isLength({ min: 10, max: 50 })
    .withMessage("email must have minimum 10 characters and max 50"),
  check("password", "password error")
    .exists()
    .withMessage("password is mandatory")
    .notEmpty()
    .withMessage("password can't be empty")
    .isString()
    .withMessage("password must be string")
    .isLength({ min: 8 })
    .withMessage("password must have minimum 8 characters"),

  validateResult,
];

module.exports = {
  createUserValidator,
};
