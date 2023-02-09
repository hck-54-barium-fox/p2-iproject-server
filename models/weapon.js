'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Weapon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Weapon.hasMany(models.myWeapon, {foreignKey: 'WeaponId'})
    }
  }
  Weapon.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    tagline: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Weapon',
  });
  return Weapon;
};