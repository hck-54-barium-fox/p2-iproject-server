'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Invoice)
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    CategoryId: {
      type:DataTypes.INTEGER,
      references:{
        model:"Categories",
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};