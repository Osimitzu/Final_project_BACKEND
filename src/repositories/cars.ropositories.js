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

module.exports = {
  getProductFromPivotREPO,
  createProductInPivotREPO,
  updateQuantityInPivotREPO,
  updateTotalInCarREPO,
};
