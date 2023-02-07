'use strict';
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
      User.hasMany(models.MyCart)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email must be unique",
        },
        notEmpty: {
          msg: "Email is required",
        },
        notNull: {
          msg: "Email is required",
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Username is required",
        },
        notNull: {
          msg: "Username is required",
        },
      },
    },
    password:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "password is required",
        },
        notNull: {
          msg: "password is required",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};