'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Playlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      watchTime: {
        type: Sequelize.DATE
      },
      memeUrl: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Users',
          key : 'id'
        }
      },
      MovieId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Movies',
          id : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Playlists');
  }
};