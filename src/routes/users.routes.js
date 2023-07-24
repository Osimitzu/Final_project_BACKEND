const { Router } = require("express");
const {
  createNewUserCTRL,
  validateEmail,
  loginCTRL,
} = require("../controllers/users.controllers");
const {
  createUserValidator,
  loginUserValidator,
} = require("../validators/users.validators");

const router = Router();

router.post("/api/v1/users", createUserValidator, createNewUserCTRL);

router.post("/api/v1/users/email-validate", validateEmail);

router.post("/api/v1/users/login", loginUserValidator, loginCTRL);

module.exports = router;
