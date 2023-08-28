const { orders } = require("../models");

const buyProductsInCarREPO = async (user_id, total_price) => {
  const order = await orders.create(user_id, total_price);
  return order;
};

module.exports = {
  buyProductsInCarREPO,
};
