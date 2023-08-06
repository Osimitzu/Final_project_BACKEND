const {
  createNewProductREPO,
  updateProductImageREPO,
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
}

module.exports = productsServices;
