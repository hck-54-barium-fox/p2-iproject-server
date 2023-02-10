'use strict';

const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = [
      {
        username:"khanz1",
        email: 'khanz1@gmail.com',
        password: "khanz1"
      }
    ]
    let dataUser = data.map((perData) => {
      perData.createdAt = new Date()
      perData.updatedAt = new Date()

      perData.password = hashPassword(perData.password)
      return perData
    })
    await queryInterface.bulkInsert('Users', dataUser, null)
  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', dataUser, null)
  
  }
};
