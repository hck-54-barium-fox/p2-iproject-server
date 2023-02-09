'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MyCart.belongsTo(models.User)
    }
  }
  MyCart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    product_api_url: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MyCart',
  });

  return MyCart;
};