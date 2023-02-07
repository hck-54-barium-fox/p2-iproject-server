'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserIdentity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserIdentity.belongsTo(models.Transaction)
    }
  }
  UserIdentity.init({
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'phoneNumber is required'
        },
        notEmpty: {
          msg: `phoneNumber can't be empty`
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'image is required'
        },
        notEmpty: {
          msg: `image can't be empty`
        }
      }
    },
    noIdentity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'noIdentity is required'
        },
        notEmpty: {
          msg: `noIdentity can't be empty`
        }
      }
    },
    TransactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'transactionId is required'
        },
        notEmpty: {
          msg: `transactionId can't be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserIdentity',
  });
  return UserIdentity;
};