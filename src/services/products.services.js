const { products } = require("../models");
const {
  createNewProductREPO,
  updateProductImageREPO,
  updateProductInfoREPO,
  getAllProductsREPO,
  deleteProductREPO,
  getProductByIdREPO,
} = require("../repositories/products.repositories");

class productsServices {
  static async createNewProductSRVC(name, description, price, available_qty) {
    try {
      // Create a new product by calling the corresponding repository function
      const product = await createNewProductREPO({
        name,
        description,
        price,
        available_qty,
      });

      // Return the newly created product
      return product;
    } catch (err) {
      // Propagate any errors to the caller
      throw err;
    }
  }

  static async updateProductImageSRVC(id, product_image) {
    try {
      // Call the corresponding repository function to update the product's image
      await updateProductImageREPO(id, product_image);

      // Return a message indicating the successful image update
      return "Image has been updated";
    } catch (err) {
      // Propagate any errors to the caller
      throw err;
    }
  }

  static async updateProductInfoSRVC(
    id,
    name,
    description,
    price,
    available_qty,
    status
  ) {
    try {
      const product = await products.findOne({
        where: { id },
      });

      if (!product) {
        throw {
          status: 400,
          name: "Invalid product",
          message: "Product doesn't exist",
        };
      }
      if (available_qty < 1 ? (status = "unavailable") : (status = "available"))
        await updateProductInfoREPO(
          id,
          name,
          description,
          price,
          available_qty,
          status
        );

      return "Info has been updated";
    } catch (err) {
      throw err;
    }
  }

  static async getAllProductsSRVC(currentPage, resultPerPage) {
    try {
      // Call the corresponding repository function to retrieve all products
      const allProducts = await getAllProductsREPO(currentPage, resultPerPage);

      // Return the list of all products
      return allProducts;
    } catch (err) {
      // Propagate any errors to the caller
      throw err;
    }
  }

  static async getProductByIdSRVC(id) {
    try {
      // Call the corresponding repository function to retrieve a product by ID
      const product = await getProductByIdREPO(id);

      // Check if the product exists
      if (!product) {
        throw {
          status: 400,
          name: "Invalid product",
          message: "Product doesn't exist",
        };
      }

      // Return the product information
      return product;
    } catch (err) {
      // Propagate any errors to the caller
      throw err;
    }
  }

  static async deleteProductSRVC(id) {
    try {
      // Find the product in the database based on the provided ID
      const product = await products.findOne({
        where: { id },
      });

      // Check if the product exists
      if (!product) {
        throw {
          status: 400,
          name: "Invalid product",
          message: "Product doesn't exist",
        };
      }

      // Call the corresponding repository function to delete the product
      await deleteProductREPO(id);
    } catch (err) {
      // Propagate any errors to the caller
      throw err;
    }
  }
}

module.exports = productsServices;
