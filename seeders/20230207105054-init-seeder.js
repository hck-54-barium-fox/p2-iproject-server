"use strict";

const { hash } = require("../helpers/bcrypt");

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
    try {
      const users = require("../datas/users.json").map((user) => {
        user.password = hash(user.password);
        user.isPurchased = false
        user.createdAt = new Date();
        user.updatedAt = new Date();
        return user;
      });
      const favorites = require("../datas/favorites.json").map((favorite) => {
        favorite.createdAt = new Date();
        favorite.updatedAt = new Date();
        favorite.UserId = 1;
        return favorite;
      });
      await queryInterface.bulkInsert("Users", users, {});
      await queryInterface.bulkInsert("Favorites", favorites, {});
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Favorites", null, {});
  },
};
