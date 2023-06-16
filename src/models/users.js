"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Tengo que comentar las relaciones, si no, no me funcionan los endpoints...
      // users.belongsTo(models.roles, { foreignKey: "role_id" });
      // users.belongsTo(models.cars, { foreignKey: "user_id" });
      // users.hasMany(models.products, { foreignKey: "user_id" });
      // users.hasMany(models.orders, { foreignKey: "user_id" });
    }
  }
  users.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
      valid_user: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
