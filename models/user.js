'use strict';
const { emptyQuery } = require('pg-protocol/dist/messages');
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
      User.hasMany(models.Transaction)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: `Email can't be empty`
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      },
      unique: {
        args: true,
        msg: `Choose another email`
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password is required'
        },
        notEmpty: {
          msg: `password can't be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};