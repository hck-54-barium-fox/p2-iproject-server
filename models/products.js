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
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "product name is required to filled up"
        },
        notEmpty: {
          msg: "product name is required to filled up"
        }
      }
    },
    product_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "product price is required to filled up"
        },
        notEmpty: {
          msg: "product price is required to filled up"
        }
      }
    },
    brand:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "brand is required to filled up"
        },
        notEmpty: {
          msg: "brand is required to filled up"
        }
      }
    },
    product_image_url:DataTypes.STRING,
    product_info: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};