'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require('../helper/byrpt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.MyProduct)
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty : {
          msg : 'username is required'
        },
        notNull: {
          msg : 'username is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      unique :{
        args : true , msg : 'email already in use'
      },
      validate : {
        isEmail : {
          msg : 'check for email format'
        },
        notEmpty : {
          msg : 'email is required'
        },
        notNull : {
          msg : 'email is required'
        },
        
      }
    },
    password:{
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty : {
          msg : 'password is required'
        },
        notNull: {
          msg : 'password is required'
        }
      }
    },
    city: {
      type : DataTypes.STRING,
      allowNull : false,
      validate:{
        notEmpty : {
          msg : 'city is required'
        },
        notNull: {
          msg : 'city is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(user => {
    user.password = hash(user.password)
  })
  return User;
};