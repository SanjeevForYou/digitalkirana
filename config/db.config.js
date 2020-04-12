const { Pool } = require("pg");
const connectionString = process.env.HEROKU_POSTGRESQL_GOLD_URL;
const pool = new Pool({
  connectionString: connectionString,
  ssl: true,
});
pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
});
