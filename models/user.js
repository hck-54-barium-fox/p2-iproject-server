'use strict';
const { Model } = require('sequelize');
const crypto = require('crypto');
const { hashPassword } = require('../helpers/bcryptjs');
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
  User.init(
    {
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      name: { type: DataTypes.STRING },
      verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      verificationToken: { type: DataTypes.STRING },
      resetPasswordToken: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  User.beforeCreate((instance, option) => {
    instance.verificationToken = crypto.randomBytes(20).toString('hex');
    instance.password = hashPassword(instance.password);
  });
  return User;
};
