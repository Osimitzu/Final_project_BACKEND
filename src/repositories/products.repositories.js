const { products } = require("../models");

const createNewProductREPO = async (newProductData) => {
  // Create a new product using the provided data
  const product = await products.create(newProductData);

  // Check if the product's available quantity is zero or less than one
  if (product.available_qty === 0 || product.available_qty < 1) {
    // If so, update the product's status to "unavailable"
    await products.update(
      { status: "unavailable" },
      {
        where: { id: product.id },
      }
    );
  }

  // Return the created product
  return product;
};

const updateProductImageREPO = async (id, product_image) => {
  // Update the product's product_image field with the provided image filename
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
  // Update the product's information fields with the provided values
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
  // Calculate the offset based on the current page and results per page
  const offset = (currentPage - 1) * resultPerPage;

  // Retrieve all products with "available" status, excluding certain attributes
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

  // Return the list of available products for the specified page
  return allProducts;
};

const getProductByIdREPO = async (id) => {
  // Retrieve a product by its ID, excluding certain attributes
  const product = await products.findOne({
    where: { id },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  // Return the product with the specified ID
  return product;
};

const deleteProductREPO = async (id) => {
  // Delete a product from the database by its ID
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
