"use strict";
const { hash } = require("../helpers/bcrypt");
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
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hash(user.password);
  });

  return User;
};
