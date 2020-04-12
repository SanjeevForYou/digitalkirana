var { Pool } = require("pg");
var connectionString = process.env.HEROKU_POSTGRESQL_GOLD_URL;
var pool = new Pool({
  connectionString: connectionString,
  ssl: true,
});
console.log("Executing query now");
pool.query("SELECT NOW()", (err, res) => {
  console.log("*** SELECT LOGS ****", err, res);
  pool.end();
});
console.log("End of query");
