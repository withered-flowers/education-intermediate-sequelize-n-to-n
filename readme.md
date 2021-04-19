## Table of Contents
1. Recap Sequelize
1. Let's see the case !
1. Let's solve it !
    - Langkah 1 - Inisialisasi Project
    - Langkah 2 - Inisialisasi Sequelize
    - Langkah 3 - Pembuatan Tabel
    - Langkah 4 - Mempopulasikan data awal dengan seeder
    - Langkah 5 - Membuat app.js dan mendefinisikan endpoint
    - Langkah 6 - Mendefinisikan association dan membuat query orm

Diceritakan pada suatu ketika ada sebuah perusahaan bernama `ecommurz` yang akan
melaunching aplikasi E-Commerce. Anda sebagai seorang developer di perusahaan
tersebut diminta untuk membuat sebuah aplikasi sederhana untuk melihat rincian
transaksi E-Commerce tersebut.

Adapun requirementdari sub-aplikasi transksi tersebut adalah:

Nama database yang digunakan adalah `ecommurz`

Rincian tabel yang digunakan adalah sebagai berikut:

```
Users
```

| Kolom              | Tipe         | Deskripsi   |
|:-------------------|:-------------|:------------|
| id                 | SERIAL       | PRIMARY KEY |
| userName           | VARCHAR(255) | NOT NULL    |
| realName           | VARCHAR(255) | NOT NULL    |
| nationalId         | VARCHAR(255) | NOT NULL    |
| birthDate          | DATE         | NOT NULL    |

```
Products
```

| Kolom              | Tipe         | Deskripsi   |
|:-------------------|:-------------|:------------|
| id                 | SERIAL       | PRIMARY KEY |
| name               | VARCHAR(255) | NOT NULL    |
| description        | VARCHAR(255) | NOT NULL    |
| price              | INTEGER      | NOT NULL    |

```
Transactions
```

| Kolom              | Tipe         | Deskripsi   |
|:-------------------|:-------------|:------------|
| id                 | SERIAL       | PRIMARY KEY |
| UserId             | INTEGER      | FOREIGN KEY |
| ProductId          | INTEGER      | FOREIGN KEY |
| qty                | INTEGER      | NOT NULL    |

Diberikan juga data awal dalam folder `data` dengan nama:
- `users.json` untuk tabel `Users`, 
- `products.json` untuk tabel `Products`,
- dan `transactions,json` untuk tabel `Transactions`

Kamu diminta untuk melakukan populasi data awal berdasarkan file json yang
telah diberikan ini.

Selain itu kamu juga diminta untuk membuat halaman websitenya.
Adapun rincian endpoint yang harus dibuat adalah sebagai berikut:
- **GET /**
Endpoint ini akan menampilkan tabel yang memiliki informasi sebagai berikut:
  - `Username` dari tabel `Users`
  - `Name` dari tabel `Products`
  - `Price` dari tabel `Products`
  - `Quantity` dari tabel `Transactions`
  - `Total Price` dari hasil perhitungan `Price x Quantity`

Kamu diminta untuk membuat ini dalam waktu tiga jam karena waktu launchingnya
sudah mepet, dan untuk tampilan sudah ada timnya tersendiri yang membuat 
tampilan tersebut !

### Let's Solve It !
Adapun langkah-langkah yang dibutuhkan dalam mengerjakan ini adalah sebagai 
berikut:

### Langkah 1 - Inisialisasi Project
1. Membuat file utama terlebih dahulu, mis `app.js`
1. Menginisialisasi npm dengan menggunakan `npm init -y`
1. Memasang package yang dibutuhkan terlebih dahulu dengan menggunakan
   `npm i express ejs pg sequelize`
1. Memasang package yang dibutuhkan untuk development terlebih dahulu dengan
   menggunakan `npm i -D nodemon sequelize-cli`
1. Mem-`blacklist` folder `node_modules` dengan menggunakan file `.gitignore` 

### Langkah 2 - Inisialisasi dan Konfigurasi Sequelize
1. Menginisialisasi sequelize dengan menggunakan `npx sequelize init`
1. Melakukan konfigurasi database sesuai dengan kebutuhan pada file 
   `config/config.json`
1. Menjalankan perintah untuk membuat database dengan 
   `npx sequelize-cli db:create`

### Langkah 3 - Membuat Tabel dan Model yang dibutuhkan
Pada langkah ini kita akan membuat tabel yang dibutuhkan yaitu `Users`, 
`Products` dan `Transactions`. Namun pada sequelize akan lebih enak bila membuat
**model** di awal, karena akan mendapatkan bonus **migrations** yang digunakan
untuk membuat tabel, langkahnya adalah sebagai berikut:
1. Membuat tabel `Users` dengan menggunakan `npx sequelize model:generate 
   --name User --attributes userName:string,realName:string,nationalId:string,
   birthDate:dateonly`
1. Memodifikasi tabel `Users` pada file `migrations/xxx-create-users.js` untuk
   menambahkan property `NOT NULL` (`allowNull: false`)
1. Membuat tabel `Products` dengan menggunakan `npx sequelize model:generate
   --name Product --attributes name:string,description:string,price:integer`
1. Memodifikasi tabel `Products` pada file `migrations/xxx-create-products.js`
   untuk menambahkan property `NOT NULL` (`allowNull: false`) 
1. Membuat tabel `Transactions` dengan menggunakan `npx sequelize model:generate
   --name Transaction --attributes UserId:integer,ProductId:integer,qty:integer`
1. Dikarenakan tabel `Transactions` ini merupakan tabel konjungsi / pivot, maka
   kita harus memodifikasi tabelnya lebih banyak lagi selain menambahkan 
   `allowNull: false`, yaitu kita harus menambahkan referencesnya, langkah ini 
   dilakukan dengan cara memodifikasi tabel `Transactions` pada file 
   `migrations/xxx-create-transcactions.js` sehingga menjadi seperti di bawah
   ini:
   ```javascript
   ...
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Transactions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        UserId: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'Users'
            },
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        ProductId: {
          type: Sequelize.INTEGER,
          references: {
            model: {
              tableName: 'Products'
            },
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        qty: {
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    }
   ```
1. Setelah membuat semua migrations untuk tabel `Users`, `Products`, dan
   `Transactions`, langkah selanjutnya adalah menjalankan perintah migrations
   pada sequelize untuk membuat tabel yang sudah dibuat dengan menggunakan
   `npx sequelize-cli db:migrate`

### Langkah 4 - Mempopulasikan data awal dengan seeder
Pada langkah ini kita akan mempopulasikan data awal dengan cara membaca data
pada folder `data` kemudian akan memodifikasi data sehingga cocok untuk 
digunakan pada tabel yang ada di database yang sudah dibuat.
1. Membuat file seeder untuk tabel `Users` dengan menggunakan
   `npx sequelize-cli seed:generate --name seed-users`
1. Memodifikasi file `seeders/xxx-seed-users.js` untuk membaca dan memasukkan
   data ke tabel `Users`. Hasil modifikasi file adalah sebagai berikut:
   ```javascript
   // seed-users.js
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
   ```
1. Membuat file seeder untuk tabel `Products` dengan menggunakan
   `npx sequelize-cli seed:generate --name seed-products`
1. Memodifikasi file `seeders/xxx-seed-products.js` untuk membaca dan memasukkan
   data ke tabel `Products`. Hasil modifikasi file adalah sebagai berikut:
   ```javascript
   // seed-products.js
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
   ```
1. Membuat file seeder untuk tabel `Transactions` dengan menggunakan
   `npx sequelize-cli seed:generate --name seed-transactions`
1. Memodifikasi file `seeders/xxx-seed-transactions.js` untuk membaca dan 
   memasukkan data ke tabel `Transactions`. Hasil modifikasi file adalah 
   sebagai berikut:
   ```javascript
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
   ```
1. Setelah membuat semua file seeders yang ada di atas, langkah selanjutnya 
   adalah menjalankan file seeders tersebut dengan menggunakan perintah
   `npx sequelize-cli db:seed:all`.
Sampai di tahap ini artinya proses modifikasi database sudah selesai 
(create db, migrations, dan seeding). Langkah selanjutnya adalah kita akan
masuk ke tahap aplikasi.

### Langkah 5 - Membuat app.js dan mendefinisikan endpoint
**DISCLAIMER**
Pada pembelajaran kali ini kita tidak: 
- menggunakan `express.Router` untuk  memodularisasi endpoint yang ada
- memodularisasi controller karena endpoint hanya sedikit
1. Membuat file `controllers/controller.js` untuk menjadi otak / handler dari
   segala endpoint yang didefinisikan.
2. Memodifikasi file `app.js` dan `controllers/controller.js` menjadi seperti
   berikut:
   
   File: controller.js
   ```javascript
   // File: controllers/controller.js
   class Controller {
     static getRootHandler(req, res) {
       // TODO: implement this later
     }
   }

   module.exports = Controller;
   ```
   
   File: app.js
   ```javascript
   // File: app.js
   const express = require('express');
   const app = express();

   const PORT = process.env.PORT || 10000;

   const Controller = require('./controllers/controller.js');

   app.set('view engine', 'ejs');
   app.use(express.urlencoded({ extended: false }));

   // GET /
   app.get('/', Controller.getRootHandler);

   app.listen(PORT, () => {
     console.log(`Apps working at ${PORT}`);
   });
   ```
Sampai di tahap ini artinya kita sudah membuat kerangka yang diperlukan
untuk membuat server yang akan menyediakan / mengquery data. Selanjutnya adalah
menyambungkannya dengan database melalui sequelize

### Langkah 6 - Mendefinisikan association dan membuat query orm
Sebelum bisa melakukan query orm, kita harus menganalisa terlebih dahulu, 
hubungan atau association antar model ini seperti apa, dan dari 
struktur model yang ada, terlihat bahwa sebenarnya ini adalah asoasiasi
`many-to-many` antara model `User` dan model `Product` yang memiliki pivot
model `Transaction`.

1. Memodifikasi file `model/user.js` dan menambahkan association terhadap model
   `Product`
   ```javascript
   static associate(models) {
     User.belongsToMany(models.Product, { through: models.Transaction });
   }
   ```
1. Memodifikasi file `model/product.js` dan menambahkan association terhadap
   model `User`
   ```javascript
   static associate(models) {
     Product.belongsToMany(models.User, { through: models.Transaction });
   }
   ``` 
1. Setelah mendefinisikan association pada kedua file tersebut, maka langkah
   selanjutnya adalah memodifikasi file `controllers/controller.js` untuk 
   melakukan query ormnya. hasil modifikasinya adalah sebagai berikut:
   ```javascript
   // import model
   const { User, Product, Transaction } = require('../models/index.js');

   ...
   static getRootHandler(req, res) {
     User
       .findAll({ include: [ Product ]})
       .then(dataCombined => {
         console.log(dataCombined);
         res.send("Berhasil");
       })
       .catch(err => {
         res.send(err);
       })
   }
   ```
1. Mari kita coba analisis isi dari datanya terlebih dahulu pada console kita
   sebelum membuat tampilan nya yah ! Ternyata data yang ada cukup sulit untuk
   dilihat bukan? Untuk mempermudah data yang terlihat kita bisa menggunakan
   `JSON.stringify` untuk mempermudah bacaannya yah, sehingga pada langkah ini
   akan memodifikasi kode menjadi sebagai berikut:
   ```javascript
   static getRootHandler(req, res) {
     User
       .findAll({ include: [ Product ]})
       .then(dataCombined => {
         console.log(JSON.stringify(dataCombined, null, 2));
         res.send("Berhasil");
       })
       .catch(err => {
         res.send(err);
       });
   }
   ```
1. Setelah melihat data yang sudah dibentuk tersebut, barulah kita membuat 
   tampilan untuk menampilkan data yang ada sesuai dengan requirement.
   Langkah ini akan membuat sebuah file `views/list.ejs` dan memodifikasinya
   untuk menampilkan data yang diinginkan. Asumsi pada langkah ini adalah
   data yang dilempar dari controller menuju `views/list.ejs` adalah
   bernama `dataCombined`

   ```html
    <table border='1'>
      <thead>
        <tr>
          <th>Username</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        <% dataCombined.forEach(user => { %>
          <% user.Products.forEach(product => { %> 
          <tr>
            <td><%= user.userName %></td>
            <td><%= product.name %></td>
            <td><%= product.price %></td>
            <td><%= product.Transaction.qty %></td>
            <td><%= product.price * product.Transaction.qty %></td>
          </tr>
          <% }) %>
        <% }) %>
      </tbody>
    </table>
   ```
1. Setelah membuat struktur tampilan ejsnya, langkah selanjutnya adalah
   menyatukan tampilan ejs dengan controllernya, dengan memodifikasi file 
   `controllers/controller.js`
   ```javascript
   static getRootHandler(req, res) {
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
   ```
1. Jalankan node dan lihatlah hasilnya !

Sampai di sini artinya kita sudah berhasil mengimplementasikan association
`many-to-many` dengan menggunakan sequelize ORM !

Kemudian langkah selanjutnya apa? Mari kita coba lihat data pada ejs kita,
kesannya sulit sekali bukan ketikan menggunakan query `many-to-many` ini?

Ada tidak yah cara yang lebih mudah lagi?

Nah untuk itu, cobalah untuk membaca tentang `Advanced M:N Association` pada
dokumentasi Sequelize, khususnya pada bagian `Super Many-to-Many Association`
yah !
