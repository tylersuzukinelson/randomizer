const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

const home = require('./routes/home.js');

const app = express();

app.set('view engine', 'ejs')

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator());
app.use(cookieParser());

app.use('/', home);

const PORT = 4545;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
