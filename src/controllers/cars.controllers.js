const carsServices = require("../services/cars.services");

const addProductToCarCTRL = async (req, res, next) => {
  try {
    // Extract data from the request body and parameters
    const { product_id, price, quantity } = req.body;
    const car_id = parseInt(req.params.id, 10);

    // Check if the provided car_id is a valid integer
    if (isNaN(car_id)) {
      return res.status(400).json({ error: "Invalid cart ID" });
    }

    // Call the service to add a product to the cart
    await carsServices.addProductToCarSRVC(product_id, price, quantity, car_id);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
};

const getAllProductsInCarCTRL = async (req, res, next) => {
  try {
    // Extract the user_id from the request parameters
    const { user_id } = req.params;

    // Call the service to retrieve all products in the user's cart
    const productsInCar = await carsServices.getAllProductsInCarSRVC(user_id);

    // Send the list of products in the cart as a JSON response
    res.status(200).json(productsInCar);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addProductToCarCTRL,
  getAllProductsInCarCTRL,
};
