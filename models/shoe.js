'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shoe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shoe.hasMany(models.Cart, { foreignKey: "ShoeId" })
    }
  }
  Shoe.init({
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Shoe',
  });
  return Shoe;
};