const { Router } = require("express");
const authenticate = require("../middlewares/auth.middlewares");
const hasRoles = require("../middlewares/role.middlewares");
const { createNewProductCTRL } = require("../controllers/products.controllers");
const { createProductValidator } = require("../validators/products.validators");

const router = Router();

router.post(
  "/api/v1/products",
  authenticate,
  hasRoles(2),
  createProductValidator,
  createNewProductCTRL
);

module.exports = router;
