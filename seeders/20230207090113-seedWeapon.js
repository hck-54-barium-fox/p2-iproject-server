'use strict';
const axios = require("axios");

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
    const { data: weaponsData } = await axios({
      method: 'GET',
      url: 'https://valorant-agents-maps-arsenal.p.rapidapi.com/arsenal/en-us',
      headers: {
        'X-RapidAPI-Key': '154585a314mshf7232f01998f523p15e12fjsnbafc718ed6b9',
        'X-RapidAPI-Host': 'valorant-agents-maps-arsenal.p.rapidapi.com'
      }
    });

    const dataSeeding = []
    weaponsData.weapons.forEach((el) => {
      const obj = {}
      obj.name = el.weapon_name,
      obj.category = el.weapon_category_machine_name
      obj.imageUrl = el.weapon_asset.url
      obj.tagline = el.weapon_tagline
      obj.price = Math.floor(Math.random() * 1000000) + 300000;
      obj.createdAt = new Date()
      obj.updatedAt = new Date()

      dataSeeding.push(obj)
    })
    await queryInterface.bulkInsert('Weapons', dataSeeding, null)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Weapons', null, null)
  }
};
