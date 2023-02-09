'use strict';
const {hash} = require('../helpers/brcypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {msg : 'Email already in use'},
      validate : {
        notNull : {msg : 'Email is required'},
        notEmpty : {msg : 'Email is required'},
        isEmail : {msg: 'Invalid email format'}
      }
    },

    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {msg : 'Password is required'},
        notNull : {msg : 'Password is required'}
      }
    }
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.addHook('beforeCreate', (customers, options)=>{
    customers.password = hash(customers.password)
  })
  return Customer;
};