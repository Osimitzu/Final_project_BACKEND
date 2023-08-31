const { orders, product_in_orders, products, users } = require("../models");

const buyProductsInCarREPO = async (user_id, total_price) => {
  const order = await orders.create(user_id, total_price);
  return order;
};

const getAllPendingOrdersREPO = async () => {
  const pendingOrders = await orders.findAll({
    where: { status: "pending" },
    attributes: {
      exclude: ["updatedAt", "user_id"],
    },
    include: [
      {
        model: users,
        as: "user",
        attributes: ["username"],
      },
      {
        model: products,
        as: "products",
        attributes: {
          exclude: ["createdAt", "updatedAt", "status", "id", "available_qty"],
        },
        through: {
          model: product_in_orders,
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"],
          },
        },
      },
    ],
  });
  return pendingOrders;
};

module.exports = {
  buyProductsInCarREPO,
  getAllPendingOrdersREPO,
};
