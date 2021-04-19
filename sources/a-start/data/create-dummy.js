const fs = require('fs/promises');
const faker = require('faker');

const NUMBEROFDATA = 10;

faker.locale = "id_ID";

let users = [];
let products = [];
let transactions = [];

for (let i = 0; i < NUMBEROFDATA; i++) {
  let objUser = {};

  objUser.userName = faker.internet.userName();
  objUser.realName = faker.name.findName();
  objUser.nationalId = faker.datatype.uuid();
  objUser.birthDate = faker.date.past();

  users.push(objUser);
}

for (let i = 0; i < NUMBEROFDATA; i++) {
  let objProduct = {};

  objProduct.name = faker.commerce.productName();
  objProduct.description = faker.commerce.productDescription();
  objProduct.price = Number(faker.commerce.price());

  products.push(objProduct);
}

for (let i = 0; i < Math.floor(NUMBEROFDATA / 2); i++) {
  let objTransaction = {};

  objTransaction.UserId = faker.datatype.number({ 'min': 1, 'max': 10 });
  objTransaction.ProductId = faker.datatype.number({ 'min': 1, 'max': 10 });
  objTransaction.qty = faker.datatype.number({ 'min': 1, 'max': 20 });

  transactions.push(objTransaction);
}

(async () => {
  try {
    await fs.writeFile('./users.json', JSON.stringify(users, null, 2));
    await fs.writeFile('./products.json', JSON.stringify(products, null, 2));
    await fs.writeFile('./transactions.json', JSON.stringify(transactions, null, 2));

    console.log("Created 3 File JSON");
  }
  catch (e) {
    console.log(e.toString());
  }
})();