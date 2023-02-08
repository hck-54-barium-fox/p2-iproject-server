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
        {
          name:'Whiskas',
          price:200000,
          stock:20,
          image:"https://asset.kompas.com/crops/bfkifZfeZH-aCzu9NocPRsnFjPg=/19x12:5634x3756/750x500/data/photo/2021/12/04/61ab16185f7b8.jpg",
          description:"Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
          CategoryId:2
        },
        {
          name:'Meo Kitten',
          price:200000,
          stock:20,
          image:"https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/11/17/bf5ba0c5-d09a-4c0d-a2b3-25e620b376ac.jpg",
          description:"Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
          CategoryId:2
        },
        {
          name:'Whiskas Tuna',
          price:200000,
          stock:20,
          image:"https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/11/17/bf5ba0c5-d09a-4c0d-a2b3-25e620b376ac.jpg",
          description:"Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
          CategoryId:2
        },
        {
          name:'Pro Plan',
          price:200000,
          stock:20,
          image:"https://merekbagus.com/wp-content/uploads/2020/10/Makanan-Kucing-Yang-Bagus.jpg",
          description:"Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
          CategoryId:2
        },
        {
          name:'Pro Plan',
          price:200000,
          stock:20,
          image:"https://merekbagus.com/wp-content/uploads/2020/10/Makanan-Kucing-Yang-Bagus.jpg",
          description:"Natural Canned Food For Dog Chicken Meat No-additive Wet Cat Food Pet Treats Pet Snacks Manufacturers",
          CategoryId:2
        },
        {
          name:'Mainan Kucing',
          price:200000,
          stock:20,
          image:"https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/8/25/d51eaa47-7604-482d-b3ba-0e9846b1a506.jpg",
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
