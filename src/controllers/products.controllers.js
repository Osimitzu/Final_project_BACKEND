const productsServices = require("../services/products.services");

const createNewProductCTRL = async (req, res, next) => {
  try {
    const { name, description, price, available_qty } = req.body;
    await productsServices.createNewProductSRVC(
      name,
      description,
      price,
      available_qty
    );
    res.status(201).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createNewProductCTRL,
};
