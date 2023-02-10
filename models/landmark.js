'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Landmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Landmark.hasMany(models.Bookmark)
    }
  }
  Landmark.init({
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Latitude is required"
        },
        notEmpty: {
          msg: "Latitude is required"
        }
      }
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Longitude is required"
        },
        notEmpty: {
          msg: "Longitude is required"
        }
      }
    },
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image URL is required"
        },
        notEmpty: {
          msg: "Image URL is required"
        }
      }
    },
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Landmark',
  });
  return Landmark;
};