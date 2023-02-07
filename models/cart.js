'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Customer, { foreignKey: "CustomerId" })
      Cart.belongsTo(models.Shoe, { foreignKey: "ShoeId" })
      Cart.hasOne(models.Transaction, { foreignKey: "CartId" })
    }
  }
  Cart.init({
    CustomerId: DataTypes.INTEGER,
    ShoeId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};