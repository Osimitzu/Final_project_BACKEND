const { Router } = require("express");
const { buyProductsInCarCTRL } = require("../controllers/orders.controllers");

const router = Router();

router.post("/api/v1/orders/buy", buyProductsInCarCTRL);

module.exports = router;
