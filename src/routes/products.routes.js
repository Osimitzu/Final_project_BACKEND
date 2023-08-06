const { Router } = require("express");
const authenticate = require("../middlewares/auth.middlewares");
const hasRoles = require("../middlewares/role.middlewares");
const {
  createNewProductCTRL,
  updateProductImageCTRL,
} = require("../controllers/products.controllers");
const { createProductValidator } = require("../validators/products.validators");

const router = Router();

router.post(
  "/api/v1/products",
  authenticate,
  hasRoles(2),
  createProductValidator,
  createNewProductCTRL
);

router.put(
  "/api/v1/products/image/:id",
  authenticate,
  hasRoles(2),
  updateProductImageCTRL
);
module.exports = router;
