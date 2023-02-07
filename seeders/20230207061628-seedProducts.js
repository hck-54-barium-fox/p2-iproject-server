'use strict';

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

      let data=[
        {
          name:'Cat Food Chicken Meat',
          price:200000,
          stock:20,
          image:"https://s.alicdn.com/@sc04/kf/H5d2cdbac67a34d459d54b015322ed64dM.jpg_300x300.jpg",
          description:"Natural Canned Food For Cat Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
          CategoryId:2
        },
        {
          name:'Dog Food',
          price:200000,
          stock:20,
          image:"https://s.alicdn.com/@sc04/kf/H0eba8a89870f4b92b696f9b9dcc6fd62e.jpg_300x300.jpg",
          description:"Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
          CategoryId:2
        },
      ]
      data=data.map(el=>{
        el.createdAt= new Date()
        el.updatedAt = new Date()

        return el
      })
      await queryInterface.bulkInsert('Products',data,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  }
};
