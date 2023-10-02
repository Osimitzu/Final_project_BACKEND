const ordersServices = require("../services/orders.services");

const buyProductsInCarCTRL = async (req, res, next) => {
  try {
    // Obtener el ID del usuario y la lista de productos del cuerpo de la solicitud
    const { user_id, products } = req.body;

    // Llamar al servicio para realizar la compra de los productos en el carrito
    const order = await ordersServices.buyProductsInCarSRVC(user_id, products);

    // Responder con el resultado de la compra en formato JSON
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

const getAllPendingOrdersCTRL = async (req, res, next) => {
  try {
    // Obtener todas las órdenes pendientes desde el servicio
    const pendingOrders = await ordersServices.getAllPendingOrdersSRVC();

    // Responder con las órdenes pendientes en formato JSON
    res.status(200).json(pendingOrders);
  } catch (err) {
    next(err);
  }
};

const completeOrderCTRL = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Completar la orden utilizando el servicio correspondiente
    await ordersServices.completeOrderSRVC(id);

    // Responder con un mensaje indicando que la orden se ha completado
    res.status(200).send("Order completed");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  buyProductsInCarCTRL,
  getAllPendingOrdersCTRL,
  completeOrderCTRL,
};
