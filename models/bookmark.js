'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookmark.belongsTo(models.Product)
    }
  }
  Bookmark.init({
    id : {
      type : DataTypes.INTEGER,
      primaryKey : true,
      allowNull : false,
      autoIncrement : true
    },
    CustomerId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    totalProduct: DataTypes.STRING,
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};