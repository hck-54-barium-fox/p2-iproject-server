'use strict';
const { hashPassword } = require("../helper/bcrypt")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Customers", [{
      username: "devifbrta",
      email: "devi@gmail.com",
      password: hashPassword("devicantik"),
      phoneNumber: 813897831,
      address: "cibinong-bogor",
      role: "Customer",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: "sonyMf",
      email: "sony@gmail.com",
      password: hashPassword("sonyganteng"),
      phoneNumber: 813707071,
      address: "rajeg-tangerang",
      role: "Customer",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.bulkDelete("customers",  null, {
    cascade: true,
    truncate: true,
    restartIdentity: true,
   })
  }
};
