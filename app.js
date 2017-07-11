const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const home = require('./routes/home.js');

const app = express();

app.set('view engine', 'ejs')

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', home);

const PORT = 4545;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
