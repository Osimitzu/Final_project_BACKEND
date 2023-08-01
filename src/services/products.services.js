const {
  createNewProductREPO,
} = require("../repositories/products.repositories");

class productsServices {
  static async createNewProductSRVC(name, description, price, available_qty) {
    try {
      await createNewProductREPO({ name, description, price, available_qty });
    } catch (err) {
      throw err;
    }
  }
}

module.exports = productsServices;
