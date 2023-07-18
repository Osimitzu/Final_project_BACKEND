const { Router } = require("express");
const {
  createNewUserCTRL,
  validateEmail,
} = require("../controllers/users.controllers");
const { createUserValidator } = require("../validators/users.validators");

const router = Router();

router.post("/api/v1/users", createUserValidator, createNewUserCTRL);

router.post("/api/v1/users/email-validate", validateEmail);

module.exports = router;
