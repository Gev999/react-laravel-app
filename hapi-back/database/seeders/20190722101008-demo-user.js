'use strict';
const bcrypt = require('bcrypt');
const login = process.env.ADMIN_LOGIN;
const password = process.env.ADMIN_PASSWORD;

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Users', [{
    name: 'Gevorg Sargsyan',
    email: login,
    password: bcrypt.hashSync(password, 8),
    created_at: new Date(),
    updated_at: new Date(),
   }], {})
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Users', null, {});
  }
};
