'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'name cannot be empty'
        },
        notEmpty: {
          msg: 'name cannot be empty'
        }
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'message cannot be empty'
        },
        notEmpty: {
          msg: 'message cannot be empty'
        }
      }
    },
    EventId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};