const { Router } = require("express");
const {
  createNewUserCTRL,
  validateEmail,
  loginCTRL,
  deleteUserCTRL,
  updateRoleCTRL,
  updateUserInfoCTRL,
} = require("../controllers/users.controllers");
const {
  createUserValidator,
  loginUserValidator,
} = require("../validators/users.validators");
const hasRoles = require("../middlewares/role.middlewares");
const authenticate = require("../middlewares/auth.middlewares");

const router = Router();

router.post("/api/v1/users", createUserValidator, createNewUserCTRL);

router.post("/api/v1/users/email-validate", validateEmail);

router.post("/api/v1/users/login", loginUserValidator, loginCTRL);

router.delete("/api/v1/users/:id", authenticate, hasRoles(2), deleteUserCTRL);

router.put("/api/v1/users/role/:id", authenticate, hasRoles(2), updateRoleCTRL);

router.put("/api/v1/users/info/:id", authenticate, updateUserInfoCTRL);

module.exports = router;
