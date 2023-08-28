const ordersServices = require("../services/orders.services");

const buyProductsInCarCTRL = async (req, res, next) => {
  try {
    const { user_id, products } = req.body;

    const order = await ordersServices.buyProductsInCarSRVC(user_id, products);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  buyProductsInCarCTRL,
};
