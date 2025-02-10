'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  students.init({
    dni: DataTypes.STRING,
    name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    teacher_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'students',
  });
  students.associate = function(models) {
    students.belongsTo(models.teachers, {
      foreignKey: 'teacher_id',
      as: 'teacher'
    });
  };
  return students;
};