"use strict";
const {hashPass} = require('../helpers/bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const getUsers = require("../User.json").map((el) => {
      (el.createdAt = new Date()), (el.updatedAt = new Date());
      el.membership = "regular";
      el.password = hashPass(el.password)
      return el;
    });
    await queryInterface.bulkInsert("Users", getUsers, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
