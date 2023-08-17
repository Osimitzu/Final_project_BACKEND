const { products } = require("../models");
const {
  createNewProductREPO,
  updateProductImageREPO,
  updateProductInfoREPO,
  getAllProductsREPO,
  deleteProductREPO,
} = require("../repositories/products.repositories");

class productsServices {
  static async createNewProductSRVC(name, description, price, available_qty) {
    try {
      await createNewProductREPO({ name, description, price, available_qty });
    } catch (err) {
      throw err;
    }
  }

  static async updateProductImageSRVC(id, product_image) {
    try {
      await updateProductImageREPO(id, product_image);

      return "Image has been updated";
    } catch (err) {
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

  static async getAllProductsSRVC() {
    try {
      const allProducts = await getAllProductsREPO();
      return allProducts;
    } catch (err) {
      throw err;
    }
  }

  static async deleteProductSRVC(id) {
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

      await deleteProductREPO(id);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = productsServices;
