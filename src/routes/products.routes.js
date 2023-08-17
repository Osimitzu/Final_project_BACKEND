const { Router } = require("express");
const authenticate = require("../middlewares/auth.middlewares");
const hasRoles = require("../middlewares/role.middlewares");
const {
  createNewProductCTRL,
  updateProductImageCTRL,
  updateProductInfoCTRL,
  getAllProductsCTRL,
  deleteProductCTRL,
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

router.get("/api/v1/products", authenticate, getAllProductsCTRL);

// Productos con precio de 1 millon en adelante se ven raros en la base de datos
router.delete(
  "/api/v1/products/delete/:id",
  authenticate,
  hasRoles(2),
  deleteProductCTRL
);

module.exports = router;
