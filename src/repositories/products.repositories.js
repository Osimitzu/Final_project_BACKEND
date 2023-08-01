const { products } = require("../models");

const createNewProductREPO = async (newProductData) => {
  const product = await products.create(newProductData);
  return product;
};

module.exports = {
  createNewProductREPO,
};
