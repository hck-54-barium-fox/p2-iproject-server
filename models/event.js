'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'title cannot be empty'
        },
        notEmpty: {
          msg: 'title cannot be empty'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'content cannot be empty'
        },
        notEmpty: {
          msg: 'content cannot be empty'
        }
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'message cannot be empty'
        },
        notEmpty: {
          msg: 'message cannot be empty'
        }
      }
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'date cannot be empty'
        },
        notEmpty: {
          msg: 'date cannot be empty'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'image cannot be empty'
        },
        notEmpty: {
          msg: 'image cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};