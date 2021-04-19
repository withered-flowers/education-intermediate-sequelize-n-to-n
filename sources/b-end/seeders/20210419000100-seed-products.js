'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const products = require('../data/products.json');

    products.forEach(product => {
      product.createdAt = new Date();
      product.updatedAt = new Date();
    });

    return queryInterface.bulkInsert('Products', products);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null);
  }
};
