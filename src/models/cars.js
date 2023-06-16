"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Tengo que comentar las relaciones, si no, no me funcionan los endpoints...
      // cars.belongsTo(models.users, { foreignKey: "user_id" });
      // cars.hasMany(models.product_in_cars, { foreignKey: "car_id" });
    }
  }
  cars.init(
    {
      user_id: DataTypes.INTEGER,
      total_price: DataTypes.REAL,
    },
    {
      sequelize,
      modelName: "cars",
    }
  );
  return cars;
};
