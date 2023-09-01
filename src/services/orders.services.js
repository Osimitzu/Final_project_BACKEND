const { product_in_orders } = require("../models");
const {
  buyProductsInCarREPO,
  getAllPendingOrdersREPO,
  infoForMail,
  emptyCar,
  completeOrderREPO,
} = require("../repositories/orders.repositories");
const { sendOrderDetailsMail } = require("../utils/sendMails");

class ordersServices {
  static async buyProductsInCarSRVC(user_id, products) {
    try {
      let total = 0;
      // el forEach se puede cambiar por el metodo "reduce"
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

      await emptyCar(user_id);

      const userEmail = await infoForMail(user_id);
      if (userEmail) {
        await sendOrderDetailsMail(userEmail);
      }

      return orderCompleted;
    } catch (err) {
      throw err;
    }
  }

  static async getAllPendingOrdersSRVC() {
    try {
      const pendingOrders = await getAllPendingOrdersREPO();
      return pendingOrders;
    } catch (err) {
      throw err;
    }
  }

  static async completeOrderSRVC(id) {
    try {
      await completeOrderREPO(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ordersServices;
