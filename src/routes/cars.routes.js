const { Router } = require("express");
const authenticate = require("../middlewares/auth.middlewares");
const { addProductToCarCTRL } = require("../controllers/cars.controllers");
const authenticateAndIdCompare = require("../middlewares/auth2.middlewares");

const router = Router();

router.post("/api/v1/cars/addProduct/:id", authenticate, addProductToCarCTRL);

module.exports = router;
