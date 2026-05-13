'use strict';

const passport = require('passport');
const { config } = require('../../config/config');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return  queryInterface.bulkInsert('users', [
    {
      email: config.gmail,
      password: config.password,
      role: config.role,
      created_at: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
