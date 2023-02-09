'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/crypto');
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
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: 'Username was taken'},
      validate: {
        notNull: {msg: 'Username is required'},
        notEmpty: {msg: 'Username is required'},
        minLength(username) {
          if(username.length < 6) {
            throw {msg: 'Username must be 6 letters or above' }
          }
        }
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: 'Email was taken'},
      validate: {
        notNull: {msg: 'Email is required'},
        notEmpty: {msg: 'Email is required'},
        isEmail: {msg: 'Email format is invalid'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Password is required'},
        notEmpty: {msg: 'Password is required'},
        valid(password) {
          if(password.length < 8) {
            throw {msg: 'Password must be 6 letters or above' }
          }
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook("beforeCreate", (user, options) => {
    user.password = hashPassword(user.password)
  })

  return User;
};