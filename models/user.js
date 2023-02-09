'use strict';
const { hashPassword } = require('../helpers/bycriptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: { 
      type :DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : "e-mail already exists"
      },
      validate : {
        isEmail : {
          msg : "format must be e-mail"
        },
        notEmpty : {
          msg : "Email is required"
        },
        notNull : {
          msg : "Email is required"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Password is required"
        },
        notNull : {
          msg : "Password is required"
        }
      }
    },
    phoneNumber: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : "Phone Number is required"
        },
        notNull : {
          msg : "Phone Number is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user, options) => {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
  });

  return User;
};