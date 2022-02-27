const bcryptjs = require("bcryptjs");
const salt = bcryptjs.genSaltSync();

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [{
      firstName: 'TestUserAdmin1',
      lastName: 'Demo',
      mail: 'testUserAdmin1@test.com',
      // Important: Password not encrypted yet! 
      password: bcryptjs.hashSync( 'bugHunteRsNodeGroup81Alkemy123!', salt ),
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
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
