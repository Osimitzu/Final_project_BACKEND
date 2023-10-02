const { cars, product_in_cars, products, users } = require("../models");
const { Op } = require("sequelize");

const carExistREPO = async (car_id) => {
  // Buscar el carrito por su ID en la base de datos
  const car = await cars.findOne({
    where: { id: car_id },
  });

  // Si no se encuentra el carrito, lanzar un error
  if (!car) {
    throw {
      status: 400,
      name: "Invalid cart",
      message: "Cart doesn't exist",
    };
  }
};

const productExistREPO = async (product_id, price) => {
  // Buscar el producto por su ID en la base de datos
  const product = await products.findOne({
    where: { id: product_id },
  });

  // Verificar si el producto no existe o el precio no coincide
  if (!product || product.price !== price) {
    throw {
      status: 400,
      name: "Invalid product",
      message: "Product doesn't exist",
    };
  }
};

const getProductFromPivotREPO = async (product_id, car_id) => {
  // Buscar el producto en la tabla de relación product_in_cars
  const product = await product_in_cars.findAll({
    where: {
      // Filtrar por car_id y product_id
      [Op.and]: [{ car_id }, { product_id }],
    },
  });

  // Devolver el resultado de la búsqueda
  return product;
};

const createProductInPivotREPO = async (
  product_id,
  price,
  quantity,
  car_id
) => {
  // Crear un nuevo registro en la tabla de relación product_in_cars
  const product = await product_in_cars.create({
    product_id,
    price,
    quantity,
    car_id,
  });

  // Devolver el producto creado en la relación
  return product;
};

const updateQuantityInPivotREPO = async (car_id, quantity) => {
  // Incrementar la cantidad de productos en el carrito en la tabla de relación product_in_cars
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
  // Incrementar la cantidad de productos en el carrito en la tabla de relación product_in_cars cuando no se proporciona una cantidad específica
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
  // Actualizar el precio total en el carrito incrementando el precio total actual con el nuevo precio de un producto multiplicado por la cantidad
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
  // Actualizar el precio total en el carrito cuando la cantidad no se especifica, multiplicando el precio de un producto por 1 y agregándolo al precio total actual.
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
  // Buscar el usuario por su ID
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

  // Buscar el carrito del usuario por su ID de usuario
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

  // Buscar todos los productos en el carrito
  const productsInCar = await product_in_cars.findAll({
    where: { car_id: car.id },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  // Calcular el precio total del carrito sumando el precio de cada producto multiplicado por su cantidad en el carrito
  const total_price = productsInCar.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  // Objeto que incluye tanto los productos en el carrito como el precio total del carrito
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
