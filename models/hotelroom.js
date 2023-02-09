'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HotelRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HotelRoom.init(
    {
      hotelName: DataTypes.TEXT,
      imgUrl: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      country: DataTypes.TEXT,
      city: DataTypes.TEXT,
      roomId: {
        type: DataTypes.INTEGER,
      },
      booked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      roomName: {
        type: DataTypes.TEXT,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'HotelRoom',
    }
  );
  return HotelRoom;
};
