const { User, Product, Transaction } = require('../models/index.js');

class Controller {
  static getRootHandler(req, res) {
    // TODO: implement this later
    User
      // eager loading
      .findAll({ include: [ Product ] })
      .then(dataCombined => {
        // console.log(JSON.stringify(dataCombined, null, 2));
        res.render('list', { dataCombined })
      })
      .catch(err => {
        res.send(err);
      });
  }
}

module.exports = Controller;