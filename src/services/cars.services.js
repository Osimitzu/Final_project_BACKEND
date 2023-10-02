const {
  getProductFromPivotREPO,
  createProductInPivotREPO,
  updateQuantityInPivotREPO,
  updateTotalInCarREPO,
  getAllProductsInCarREPO,
  productExistREPO,
  carExistREPO,
  updateTotalInCarNoQuantityREPO,
  updateQuantityInPivotNoQuantityREPO,
} = require("../repositories/cars.ropositories");

class carsServices {
  static async addProductToCarSRVC(product_id, price, quantity, car_id) {
    try {
      await carExistREPO(car_id);

      await productExistREPO(product_id, price);

      if (quantity < 1) {
        throw {
          status: 400,
          name: "Invalid quantity of products",
          message: "To add a product the amount must be greater than 0",
        };
      }

      const product = await getProductFromPivotREPO(product_id, car_id);

      if (product.length < 1) {
        await createProductInPivotREPO(product_id, price, quantity, car_id);
      }
      if (product.length > 0 && quantity) {
        await updateQuantityInPivotREPO(car_id, quantity);
      } else if (product.length > 0 && !quantity) {
        await updateQuantityInPivotNoQuantityREPO(car_id);
      }

      if (quantity) {
        await updateTotalInCarREPO(price, car_id, quantity);
      } else {
        await updateTotalInCarNoQuantityREPO(price, car_id);
      }
    } catch (err) {
      throw err;
    }
  }

  static async getAllProductsInCarSRVC(user_id) {
    try {
      // Obtener todos los productos en el carrito del usuario
      const productsInCar = await getAllProductsInCarREPO(user_id);

      return productsInCar;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = carsServices;
