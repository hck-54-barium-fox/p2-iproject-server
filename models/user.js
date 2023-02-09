'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UsersEvent)
      User.hasMany(models.Patron)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Username has benn used"
      },
      validate: {
        notNull: {
          msg: "Username is required"
        },
        notEmpty: {
          msg: "Username is required"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email has benn used, please use another email"
      },
      validate: {
        notNull: {
          msg: "Username is required"
        },
        notEmpty: {
          msg: "Username is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Username is required"
        },
        notEmpty: {
          msg: "Username is required"
        }
      }
    },
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((data) => {
    return data.password = hashPassword(data.password)
  })
  return User;
};

