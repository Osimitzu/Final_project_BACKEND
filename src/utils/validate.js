const { validationResult } = require("express-validator");

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    next({
      status: 400,
      name: "Validation error",
      message: err.errors.map((err) => err.msg),
    });
  }
};

module.exports = validateResult;
