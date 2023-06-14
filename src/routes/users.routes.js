const { Router } = require("express");
const { createNewUserCTRL } = require("../controllers/users.controllers");

const router = Router();

router.post("/users", createNewUserCTRL);

module.exports = router;
