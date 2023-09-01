const {
  orders,
  product_in_orders,
  products,
  users,
  product_in_cars,
  cars,
} = require("../models");

const buyProductsInCarREPO = async (user_id, total_price) => {
  const order = await orders.create(user_id, total_price);
  return order;
};

const emptyCar = async (user_id) => {
  // const data = await orders.findOne({
  //   where: { user_id },
  //   include: [
  //     {
  //       model: users,
  //       as: "user",
  //       include: [
  //         {
  //           model: cars,
  //           as: "car",
  //           attributes: ["total_price"],
  //           include: [
  //             {
  //               model: product_in_cars,
  //               as: "products_in_car",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // });

  // await cars.update(
  //   { total_price: 0 },
  //   {
  //     where: { id: data.user.car.id },
  //   }
  // );

  // await product_in_cars.destroy({
  //   where: { car_id: data.user.car.id },
  // });
  // Buscar el carro del usuario
  const car = await cars.findOne({
    where: { user_id },
  });

  if (!car) {
    throw {
      status: 400,
      name: "Invalid car",
      message: "Car doesn't exist",
    };
  }

  // Actualizar el total_price del carro a 0
  await cars.update(
    { total_price: 0 },
    {
      where: { id: car.id },
    }
  );

  // Eliminar todos los productos en el carrito
  await product_in_cars.destroy({
    where: { car_id: car.id },
  });
};

const infoForMail = async (user_id) => {
  const data = await orders.findOne({
    where: { user_id },
    include: [
      {
        model: users,
        as: "user",
        attributes: ["email"],
      },
    ],
  });

  if (data && data.user) {
    const userEmail = data.user.email;
    return userEmail;
  }
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

const completeOrderREPO = async (id) => {
  await orders.update(
    { status: "completed" },
    {
      where: { id },
    }
  );
};

module.exports = {
  buyProductsInCarREPO,
  getAllPendingOrdersREPO,
  infoForMail,
  emptyCar,
  completeOrderREPO,
};
