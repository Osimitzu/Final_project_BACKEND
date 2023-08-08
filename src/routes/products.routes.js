const { Router } = require("express");
const authenticate = require("../middlewares/auth.middlewares");
const hasRoles = require("../middlewares/role.middlewares");
const {
  createNewProductCTRL,
  updateProductImageCTRL,
  updateProductInfoCTRL,
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

router.put(
  "/api/v1/products/info/:id",
  authenticate,
  hasRoles(2),
  updateProductInfoCTRL
);

module.exports = router;
