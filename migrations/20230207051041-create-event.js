'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false, 
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      day: {
        allowNull: false,
        type: Sequelize.STRING
      },
      time: {
        allowNull: false,
        type: Sequelize.STRING
      },
      CategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER, 
        references: {
          model : 'Categories', 
          key : 'id'
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
    await queryInterface.dropTable('Events');
  }
};