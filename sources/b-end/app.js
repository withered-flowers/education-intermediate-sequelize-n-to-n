const express = require('express');
const app = express();

const PORT = process.env.PORT || 10000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));



app.listen(PORT, () => {
  console.log(`Apps working at ${port}`);
});