const express = require('express');
const app = express();

const PORT = process.env.PORT || 10000;

const Controller = require('./controllers/controller.js');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// GET /
app.get('/', Controller.getRootHandler);

app.listen(PORT, () => {
  console.log(`Apps working at ${port}`);
});