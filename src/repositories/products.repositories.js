const { products } = require("../models");

const createNewProductREPO = async (newProductData) => {
  const product = await products.create(newProductData);
  return product;
};

const updateProductImageREPO = async (id, product_image) => {
  await products.update(
    {
      product_image,
    },
    {
      where: { id },
    }
  );
};

module.exports = {
  createNewProductREPO,
  updateProductImageREPO,
};
