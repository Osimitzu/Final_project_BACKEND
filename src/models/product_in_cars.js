"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_in_cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Tengo que comentar las relaciones, si no, no me funcionan los endpoints...
      // product_in_cars.belongsTo(models.products, { foreignKey: "product_id" });
      // product_in_cars.belongsTo(models.cars, { foreignKey: "car_id" });
    }
  }
  product_in_cars.init(
    {
      car_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.REAL,
      status: DataTypes.ENUM("unpurchased", "purchased"),
    },
    {
      sequelize,
      modelName: "product_in_cars",
    }
  );
  return product_in_cars;
};
