'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsToMany(models.Customer, {
        through : models.Bookmark
      })
    }
  }
  Products.init({
    product_name: DataTypes.STRING,
    product_price: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    product_image_url: DataTypes.STRING,
    product_info: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};