const { product_in_orders } = require("../models");
const { buyProductsInCarREPO } = require("../repositories/orders.repositories");

class ordersServices {
  static async buyProductsInCarSRVC(user_id, products) {
    try {
      let total = 0;
      products.forEach((product) => {
        total += product.price * product.quantity;
      });

      const order = await buyProductsInCarREPO({ user_id, total_price: total });

      const productsWithOrder = products.map((product) => ({
        ...product,
        order_id: order.id,
      }));

      await product_in_orders.bulkCreate(productsWithOrder);

      const orderCompleted = {
        order_id: order.id,
        total_price: order.total_price,
        products: productsWithOrder,
      };

      return orderCompleted;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ordersServices;
