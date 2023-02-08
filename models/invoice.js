'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.User)
      Invoice.belongsTo(models.Product)
    }
  }
  Invoice.init({
    ProductId:{
      type: DataTypes.INTEGER,
      references:{
        model:'Products',
        key:'id'
      }
    },
    UserId:{
      type: DataTypes.INTEGER,
      references:{
        model:'Products',
        key:'id'
      }
    },
    totalPrice: DataTypes.INTEGER,
    status:{
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};