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
    }
  }
  Transaction.init({
    log: {
      type:DataTypes.STRING,
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
    paymentDate: {
      type:DataTypes.DATE,
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
    paymentBy: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          message:'username is required'
        },
        notNull: {
          message: 'username is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};