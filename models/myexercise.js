'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyExercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyExercise.belongsTo(models.User)
    }
  }
  MyExercise.init({
    UserId: DataTypes.INTEGER,
    bodyPart: DataTypes.STRING,
    equipment: DataTypes.STRING,
    gifUrl: DataTypes.STRING,
    name: DataTypes.STRING,
    target: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MyExercise',
  });
  return MyExercise;
};