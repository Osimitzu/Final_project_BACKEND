const { cars, product_in_cars, products } = require("../models");
const { Op } = require("sequelize");

const getProductFromPivotREPO = async (product_id, car_id) => {
  const product = await product_in_cars.findAll({
    where: {
      [Op.and]: [{ car_id }, { product_id }],
    },
  });
  return product;
};

const createProductInPivotREPO = async (
  product_id,
  price,
  quantity,
  car_id
) => {
  const product = await product_in_cars.create({
    product_id,
    price,
    quantity,
    car_id,
  });
  return product;
};

const updateQuantityInPivotREPO = async (car_id, quantity) => {
  await product_in_cars.increment(
    {
      quantity,
    },
    {
      where: { car_id },
    }
  );
};

const updateTotalInCarREPO = async (price, car_id, quantity) => {
  const car = await cars.increment(
    { total_price: price * quantity },
    {
      where: { id: car_id },
    }
  );
  return car;
};

const getAllProductsInCarREPO = async (user_id) => {
  const car = await cars.findOne({
    where: { user_id },
  });

  if (!car) {
    return res.status(400).json({
      error: "Invalid car",
      message: "Car doesn't exist",
    });
  }

  const productsInCar = await product_in_cars.findAll({
    where: { car_id: car.id },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  // total_price del carrito
  const total_price = productsInCar.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  // Objeto que incluye tanto los productos como el total_price
  const result = {
    total_price,
    products: productsInCar,
  };

  return result;
};

module.exports = {
  getProductFromPivotREPO,
  createProductInPivotREPO,
  updateQuantityInPivotREPO,
  updateTotalInCarREPO,
  getAllProductsInCarREPO,
};
