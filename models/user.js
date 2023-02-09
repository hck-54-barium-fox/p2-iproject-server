"use strict";
const { hash } = require("../helpers/bcrypt");
const Crypto = require("crypto");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post);
      User.hasMany(models.Like);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "username is Required",
          },
          notEmpty: {
            msg: "username is Required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: "Email mush be Unique",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "email is Required",
          },
          notEmpty: {
            msg: "email is Required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password is Required",
          },
          notEmpty: {
            msg: "password is Required",
          },
        },
      },
      status: { type: DataTypes.BOOLEAN, defaultValue: false },
      verifyToken: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hash(user.password);
    user.verifyToken = Crypto.randomBytes(10).toString("hex");
  });

  return User;
};
