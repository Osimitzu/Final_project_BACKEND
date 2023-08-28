const { Router } = require("express");
const authenticate = require("../middlewares/auth.middlewares");
const {
  addProductToCarCTRL,
  getAllProductsInCarCTRL,
} = require("../controllers/cars.controllers");
const authenticateAndIdCompare = require("../middlewares/auth2.middlewares");

const router = Router();

router.post("/api/v1/cars/addProduct/:id", authenticate, addProductToCarCTRL);

router.get(
  "/api/v1/cars/products/:user_id",
  authenticate,
  getAllProductsInCarCTRL
);

module.exports = router;
