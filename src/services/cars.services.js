const {
  getProductFromPivotREPO,
  createProductInPivotREPO,
  updateQuantityInPivotREPO,
  updateTotalInCarREPO,
  getAllProductsInCarREPO,
} = require("../repositories/cars.ropositories");

class carsServices {
  static async addProductToCarSRVC(product_id, price, quantity, car_id) {
    try {
      const product = await getProductFromPivotREPO(product_id, car_id);

      if (product.length < 1) {
        await createProductInPivotREPO(product_id, price, quantity, car_id);
      }

      if (product.length > 0) {
        await updateQuantityInPivotREPO(car_id, quantity);
      }

      await updateTotalInCarREPO(price, car_id, quantity);
    } catch (err) {
      throw err;
    }
  }

  static async getAllProductsInCarSRVC(user_id) {
    try {
      const productsInCar = await getAllProductsInCarREPO(user_id);
      return productsInCar;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = carsServices;
