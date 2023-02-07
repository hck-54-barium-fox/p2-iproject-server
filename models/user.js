'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Deck)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'E-mail is required'
        },
        notNull: {
          msg: 'E-mail is required'
        },
        isEmail: {
          msg: 'Please insert e-mail format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        notNull: {
          msg: 'Password is required'
        },
        len: {
          args: [5, 100],
          msg: 'Password be at least 5 characters long'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  }); 

  // Hook hash password
  User.beforeCreate(user => {
    user.password = hash(user.password)
  })
  return User;
};