const { User, Product, Transaction } = require('../models/index.js');

class Controller {
  static getRootHandler(req, res) {
    // TODO: implement this later
    User
      // eager loading
      .findAll({ include: [ Product ] })
      .then(dataCombined => {
        console.log(dataCombined);
        res.send("Berhasil");
      })
      .catch(err => {
        res.send(err);
      });
  }
}

module.exports = Controller;