'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Player.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          message:'name is required'
        },
        notNull: {
          message: 'name is required'
        }
      }
    },
    imageUrl: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          message:'imageUrl is required'
        },
        notNull: {
          message: 'imageUrl is required'
        }
      }
    },
    team: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          message:'team is required'
        },
        notNull: {
          message: 'team is required'
        }
      }
    },
    position: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          message:'position is required'
        },
        notNull: {
          message: 'position is required'
        }
      }
    },
    number: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: {
          message:'number is required'
        },
        notNull: {
          message: 'number is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};