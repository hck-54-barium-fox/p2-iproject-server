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
    }
  }
  User.init({
    username:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Username is required"
        },
        notEmpty:{
          msg:"Username is required"
        }
      }
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        notNull:{
          msg:"Email is required"
        },
        notEmpty:{
          msg:"Email is required"
        },
        isEmail:{
          msg:"Must be in email format"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Password is required"
        },
        notEmpty:{
          msg:"Password is required"
        }
      }
    },
    status: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Status is required"
        },
        notEmpty:{
          msg:"Status is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook("beforeValidate",(user,options)=>{
    user.password = hashPassword(user.password)
    user.status = 'standard'
  })
  return User;
};