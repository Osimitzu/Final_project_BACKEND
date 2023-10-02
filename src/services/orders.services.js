const { product_in_orders } = require("../models");
const {
  buyProductsInCarREPO,
  getAllPendingOrdersREPO,
  infoForMail,
  emptyCar,
  completeOrderREPO,
  verifyCar,
} = require("../repositories/orders.repositories");
const { sendOrderDetailsMail } = require("../utils/sendMails");

class ordersServices {
  static async buyProductsInCarSRVC(user_id, products) {
    try {
      // Verificar que el usuario tenga un carrito
      await verifyCar(user_id);

      let total = 0;
      // el forEach se puede cambiar por el metodo "reduce"
      products.forEach((product) => {
        total += product.price * product.quantity;
      });

      // Crear una nueva orden con el total calculado
      const order = await buyProductsInCarREPO({ user_id, total_price: total });

      // Asociar cada producto con la orden creando un array de productos con el ID de la orden
      const productsWithOrder = products.map((product) => ({
        ...product,
        order_id: order.id,
      }));

      // Crear múltiples registros en la tabla product_in_orders
      await product_in_orders.bulkCreate(productsWithOrder);

      // Crear un objeto que contenga detalles de la orden completada
      const orderCompleted = {
        order_id: order.id,
        total_price: order.total_price,
        products: productsWithOrder,
      };

      // Vaciar el carrito del usuario
      await emptyCar(user_id);

      // Obtener la dirección de correo electrónico del usuario
      const userEmail = await infoForMail(user_id);

      // Si se encuentra una dirección de correo electrónico, enviar un correo electrónico con los detalles de la orden
      if (userEmail) {
        await sendOrderDetailsMail(userEmail);
      }

      // Devolver los detalles de la orden completada
      return orderCompleted;
    } catch (err) {
      throw err;
    }
  }

  static async getAllPendingOrdersSRVC() {
    try {
      // Obtener todas las órdenes pendientes de la base de datos
      const pendingOrders = await getAllPendingOrdersREPO();

      // Devolver la lista de órdenes pendientes
      return pendingOrders;
    } catch (err) {
      // Capturar y propagar cualquier error que pueda ocurrir
      throw err;
    }
  }

  static async completeOrderSRVC(id) {
    try {
      // Marcar una orden como completada en la base de datos
      await completeOrderREPO(id);
    } catch (err) {
      // Capturar y propagar cualquier error que pueda ocurrir
      throw err;
    }
  }
}

module.exports = ordersServices;
