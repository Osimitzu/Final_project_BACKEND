const { products } = require("../models");

const createNewProductREPO = async (newProductData) => {
  const product = await products.create(newProductData);

  if (product.available_qty === 0 || product.available_qty < 1) {
    await products.update(
      // También funciona así: { status: (product.status = "unavailable") },
      { status: "unavailable" },
      {
        where: { id: product.id },
      }
    );
  }
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

const getAllProductsREPO = async (currentPage, resultPerPage) => {
  const offset = (currentPage - 1) * resultPerPage;

  const allProducts = await products.findAll({
    where: {
      status: "available",
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "status"],
    },
    limit: resultPerPage,
    offset: offset,
  });
  return allProducts;
};

const getProductByIdREPO = async (id) => {
  const product = await products.findOne({
    where: { id },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return product;
};

const deleteProductREPO = async (id) => {
  await products.destroy({
    where: { id },
  });
};

module.exports = {
  createNewProductREPO,
  updateProductImageREPO,
  updateProductInfoREPO,
  getAllProductsREPO,
  getProductByIdREPO,
  deleteProductREPO,
};
