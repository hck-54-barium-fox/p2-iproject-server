'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Bookmarks", [{
      CustomerId: 1,
      ProductId: 1,
      totalProduct: 1000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      CustomerId: 2,
      ProductId: 2,
      totalProduct: 1000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Bookmarks",null, {
      cascade: true,
      truncate: true,
      restartIdentity: true,
     })
  }
};
