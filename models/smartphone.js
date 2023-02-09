'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Smartphone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Smartphone.hasMany(models.Transaction)
    }
  }
  Smartphone.init({
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'brand of smartphone is required'
        },
        notEmpty: {
          msg: `brand of smartphone can't be empty`
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name of smartphone is required'
        },
        notEmpty: {
          msg: `name of smartphone can't be empty`
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'imageUrl is required'
        },
        notEmpty: {
          msg: `imageUrl can't be empty`
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'description is required'
        },
        notEmpty: {
          msg: `description can't be empty`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'price is required'
        },
        notEmpty: {
          msg: `price can't be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Smartphone',
  });
  return Smartphone;
};