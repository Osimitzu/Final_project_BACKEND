const { Router } = require("express");
const {
  buyProductsInCarCTRL,
  getAllPendingOrdersCTRL,
  completeOrderCTRL,
} = require("../controllers/orders.controllers");
const authenticate = require("../middlewares/auth.middlewares");
const hasRoles = require("../middlewares/role.middlewares");

const router = Router();

router.post("/api/v1/orders/buy", authenticate, buyProductsInCarCTRL);

router.get(
  "/api/v1/orders/allPendingOrders",
  authenticate,
  hasRoles(2),
  getAllPendingOrdersCTRL
);

router.put(
  "/api/v1/orders/completeOrder/:id",
  authenticate,
  hasRoles(2),
  completeOrderCTRL
);

module.exports = router;
