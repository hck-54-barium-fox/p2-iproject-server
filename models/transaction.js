'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Smartphone)
      Transaction.belongsTo(models.User)
    }
  }
  Transaction.init({
    status: DataTypes.STRING,
    SmartphoneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'SmartphoneId is required'
        },
        notEmpty: {
          msg: `SmartphoneId can't be empty`
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId is required'
        },
        notEmpty: {
          msg: `UserId can't be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};