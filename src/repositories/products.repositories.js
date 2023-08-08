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

const updateProductInfoREPO = async (
  id,
  name,
  description,
  price,
  available_qty,
  status
) => {
  await products.update(
    {
      name,
      description,
      price,
      available_qty,
      status,
    },
    {
      where: { id },
    }
  );
};

module.exports = {
  createNewProductREPO,
  updateProductImageREPO,
  updateProductInfoREPO,
};
