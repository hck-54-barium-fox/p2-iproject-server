'use strict';
const axios = require('axios')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    let { data: shoesData } = await axios({
      method: 'GET',
      url: 'https://shoes-collections.p.rapidapi.com/shoes',
      headers: {
        'X-RapidAPI-Key': 'a2b6d09126mshfa524d64e7e69dap130cb7jsnf2df498b94eb',
        'X-RapidAPI-Host': 'shoes-collections.p.rapidapi.com'
      }
    })

    const shoesDataSeeding = []

    shoesData.forEach((el) => {
      const obj = {}
      obj.name = el.name
      obj.imageUrl = el.image
      obj.price = el.price * 14500
      obj.createdAt = new Date()
      obj.updatedAt = new Date()

      shoesDataSeeding.push(obj)
    })

    await queryInterface.bulkInsert('Shoes', shoesDataSeeding, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Shoes', null, {})
  }
};
