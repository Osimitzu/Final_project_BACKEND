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

const getAllProductsREPO = async () => {
  const allProducts = await products.findAll({
    where: {
      status: "available",
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "status"],
    },
  });
  return allProducts;
};

module.exports = {
  createNewProductREPO,
  updateProductImageREPO,
  updateProductInfoREPO,
  getAllProductsREPO,
};
