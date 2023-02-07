'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Deck.init({
    UserId: DataTypes.INTEGER,
    CardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Deck',
  });
  return Deck;
};