'use strict';
const { hashPassword } = require('../helpers/bcrypt')
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
      User.hasMany(models.Item)
    }
  }
  User.init({
    username: {
      allowNull: false,
      unique: { message: 'username already exists' },
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: `username is required`
        },
        notEmpty: {
          msg: `username is required`
        }
      }
    },
    email: {
      allowNull: false,
      unique: { message: 'email already exists' },
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: `email is required`
        },
        notEmpty: {
          msg: `email is required`
        },
        isEmail: {
          msg: `enter the email in the correct format`
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [5, 50]
      }
    },
    payment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(instance => {
    instance.password = hashPassword(instance.password)
  })
  return User;
};