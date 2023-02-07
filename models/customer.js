'use strict';
const {hashPassword} = require("../helper/bcrypt")
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsToMany(models.Products, {
        through : models.Bookmark
      })
    }
  }
  Customer.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "username is required to filled up"
        },
        notEmpty: {
          msg: "username is required to filled up"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "emaiil must be unique"
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: "email is required to filled up"
        },
        notEmpty: {
          msg: "email is required to filled up"
        },
        isEmail: {
          msg: "email using email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password is required to filled up"
        },
        notEmpty: {
          msg: "password is required to filled up"
        },
        len: {
          args: [5],
          msg: "password required length minimum is 5"
        },
      }
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.beforeCreate((customer) => {
    customer.role = "Customer"
    customer.password = hashPassword(customer.password)
  })
  return Customer;
};