'use strict';

const { config } = require('../../config/config');

module.exports = {
  async up (queryInterface, Sequelize) {
   return  queryInterface.bulkInsert('users', [
    {
      email: config.gmail,
      password: config.password,
      role: config.role,
      create_at: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
