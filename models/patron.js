'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patron extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patron.belongsTo(models.User)
    }
  }
  Patron.init({
    name: DataTypes.STRING,
    jumlah: DataTypes.INTEGER,
    donaturId: DataTypes.INTEGER,
    category: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Patron',
  });
  return Patron;
};