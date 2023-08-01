const { check } = require("express-validator");
const validateResult = require("../utils/validate");

const createProductValidator = [
  check("name", "name error")
    .exists()
    .withMessage("name is mandatory")
    .notEmpty()
    .withMessage("name can't be empty")
    .isString()
    .withMessage("name must be string")
    .isLength({ max: 50 })
    .withMessage("name can have max 50 characters"),
  check("price", "price error")
    .exists()
    .withMessage("price is mandatory")
    .notEmpty()
    .withMessage("price can't be empty")
    .isDecimal()
    .withMessage("price must be decimal"),

  validateResult,
];

module.exports = {
  createProductValidator,
};
