const { cars, product_in_cars, products, users } = require("../models");
const { Op } = require("sequelize");

const carExistREPO = async (car_id) => {
  const car = await cars.findOne({
    where: { id: car_id },
  });
  if (!car) {
    throw {
      status: 400,
      name: "Invalid cart",
      message: "Cart doesn't exist",
    };
  }
};

const productExistREPO = async (product_id, price) => {
  const product = await products.findOne({
    where: { id: product_id },
  });
  if (!product || product.price !== price) {
    throw {
      status: 400,
      name: "Invalid product",
      message: "Product doesn't exist",
    };
  }
};

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

const updateQuantityInPivotNoQuantityREPO = async (car_id) => {
  const quantity = 1;
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
  await cars.increment(
    {
      total_price: price * quantity,
    },
    {
      where: { id: car_id },
    }
  );
};

const updateTotalInCarNoQuantityREPO = async (price, car_id) => {
  await cars.increment(
    {
      total_price: price * 1,
    },
    {
      where: { id: car_id },
    }
  );
};

const getAllProductsInCarREPO = async (user_id) => {
  const user = await users.findOne({
    where: { id: user_id },
  });

  if (!user) {
    throw {
      status: 400,
      name: "Invalid user",
      message: "User doesn't exist",
    };
  }

  const car = await cars.findOne({
    where: { user_id },
  });

  if (!car) {
    throw {
      status: 400,
      name: "Invalid cart",
      message: "Cart doesn't exist",
    };
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
  carExistREPO,
  productExistREPO,
  getProductFromPivotREPO,
  createProductInPivotREPO,
  updateQuantityInPivotREPO,
  updateQuantityInPivotNoQuantityREPO,
  updateTotalInCarREPO,
  updateTotalInCarNoQuantityREPO,
  getAllProductsInCarREPO,
};
