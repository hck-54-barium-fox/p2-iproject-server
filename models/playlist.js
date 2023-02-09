'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Playlist.init({
    watchTime: DataTypes.DATE,
    memeUrl: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};