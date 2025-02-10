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
      // define association here
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      type: DataTypes.STRING,
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  users.associate = function (models) {
    users.hasOne(models.teachers, {
      foreignKey: "user_id",
      as: "teacher",
    });
  };
  return users;
};
