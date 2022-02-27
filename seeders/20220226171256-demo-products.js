'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [{
      name: "Baguel de salmon",
      description: "Baguel de salmon con queso finlandia",
      image: "h",
      price: "230",
      stock: "500",
      createdAt: new Date,
      updatedAt: new Date
    }], 
    [{
      name: "Baguel de salmon",
      description: "Baguel de salmon con queso finlandia",
      img_url: "h",
      price: "230",
      stock: "500",
      createdAt: new Date,
      updatedAt: new Date
    }], 
    [{
      name: "Baguel de salmon",
      description: "Baguel de salmon con queso finlandia",
      img_url: "h",
      price: "230",
      stock: "500",
      createdAt: new Date,
      updatedAt: new Date
    }], 
    {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
