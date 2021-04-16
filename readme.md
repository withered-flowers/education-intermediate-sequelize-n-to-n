## Table of Contents
1. Recap Sequelize
1. Let's see the case !
1. Let's solve it !
    - Langkah 1 - Inisialisasi Project
    - Langkah 2 - Inisialisasi Sequelize
    - Langkah 3 - Pembuatan Tabel

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
   `allowNull: false`, yaitu kita harus menambahkan referencesnya, sehingga
   