'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const transactions = require('../data/transactions.json');

    transactions.forEach(transaction => {
      transaction.createdAt = new Date();
      transaction.updatedAt = new Date();
    });

    return queryInterface.bulkInsert('Transactions', transactions);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null);
  }
};
