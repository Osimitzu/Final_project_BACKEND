"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orders.belongsTo(models.users, { foreignKey: "user_id" });
      orders.hasMany(models.product_in_orders, { foreignKey: "order_id" });
    }
  }
  orders.init(
    {
      user_id: DataTypes.INTEGER,
      total_price: DataTypes.REAL,
      status: DataTypes.ENUM("pending", "completed"),
    },
    {
      sequelize,
      modelName: "orders",
    }
  );
  return orders;
};
