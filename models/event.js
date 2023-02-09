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
      Event.belongsTo(models.Category)
      Event.hasMany(models.UsersEvent)
    }
  }
  Event.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    day: DataTypes.STRING,
    time: DataTypes.STRING,
    place: DataTypes.STRING,
    imageUrl: DataTypes.STRING, 
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};