const { Router } = require("express");
const { createNewUserCTRL } = require("../controllers/users.controllers");

const router = Router();

router.post("/api/v1/users", createNewUserCTRL);

module.exports = router;
