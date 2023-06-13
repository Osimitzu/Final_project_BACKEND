"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_in_orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product_in_orders.belongsTo(models.products, {
        foreignKey: "product_id",
      });
      product_in_orders.belongsTo(models.orders, { foreignKey: "order_id" });
    }
  }
  product_in_orders.init(
    {
      order_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.REAL,
    },
    {
      sequelize,
      modelName: "product_in_orders",
    }
  );
  return product_in_orders;
};
