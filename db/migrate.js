const db = require('./index');

db.query(`
  CREATE TABLE history (
    id SERIAL PRIMARY KEY NOT NULL,
    names TEXT,
    method VARCHAR(255),
    number INT
  )
`)
  .then(() => {
    console.log('Created table "history"');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit();
  })
