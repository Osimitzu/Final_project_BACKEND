const { Router } = require("express");
const {
  buyProductsInCarCTRL,
  getAllPendingOrdersCTRL,
} = require("../controllers/orders.controllers");
const authenticate = require("../middlewares/auth.middlewares");
const hasRoles = require("../middlewares/role.middlewares");

const router = Router();

router.post("/api/v1/orders/buy", buyProductsInCarCTRL);

router.get(
  "/api/v1/orders/allPendingOrders",
  authenticate,
  hasRoles(2),
  getAllPendingOrdersCTRL
);

module.exports = router;
