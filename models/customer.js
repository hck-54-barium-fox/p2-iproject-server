'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/helper');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Cart, { foreignKey: "CustomerId" })
    }
  }
  Customer.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Email must be unique" },
      validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email is required" },
        isEmail: { msg: "Invalid email format" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password is required" }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name is required" }
      }
    }
  }, {
    sequelize,
    modelName: 'Customer',
  });

  Customer.beforeCreate((cust) => {
    cust.password = hash(cust.password)
  })

  return Customer;
};