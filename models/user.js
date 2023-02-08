'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require('../helpers/bcrypt')
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
    username: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: {
        message: 'username has been taken'
      },
      allowNull: false,
      validate:{
        notEmpty: {
          message:'username is required'
        },
        notNull: {
          message: 'username is required'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      unique : {
        message: 'email has been taken'
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'email is required'
        },
        notEmpty: {
          msg: 'email is required'
        },
        isEmail: {
          msg: 'invalid email format'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'password is required',
        },
        notNull: {
          message: 'password is required'
        }
      }
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(instance => {
    instance.password = hash(instance.password)
  })
  return User;
};