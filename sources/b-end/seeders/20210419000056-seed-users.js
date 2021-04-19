'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = require('../data/users.json');

    users.forEach(user => {
      user.createdAt = new Date();
      user.updatedAt = new Date();
    });

    return queryInterface.bulkInsert('Users', users);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null);
  }
};
