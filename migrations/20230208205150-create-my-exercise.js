'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MyExercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      bodyPart: {
        type: Sequelize.STRING
      },
      equipment: {
        type: Sequelize.STRING
      },
      gifUrl: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      target: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('MyExercises');
  }
};