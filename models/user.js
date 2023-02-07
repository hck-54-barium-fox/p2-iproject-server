"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Favorite);
    }
  }
  User.init(
    {
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Firstname is required",
          },
          notEmpty: {
            msg: "Firstname is required",
          },
        },
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Lastname is required",
          },
          notEmpty: {
            msg: "Lastname is required",
          },
        },
      },
      email: {
        unique: {
          msg: "Email must be unique",
        },
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "Invalid email format",
          },
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
        },
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await hash(user.password);
    user.password = hashedPassword;
  });
  return User;
};
