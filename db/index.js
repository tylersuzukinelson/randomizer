const pgp = require('pg-promise')();
const db = pgp({
  host: 'localhost',
  database: 'randomizer_dev',
  user: 'samuel',
  password: 'samuel'
});

module.exports = db;
