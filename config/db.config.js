const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.HEROKU_POSTGRESQL_GOLD_URL,
  ssl: true,
});

client.connect();

client.query(
  "SELECT table_schema,table_name FROM information_schema.tables;",
  (err, res) => {
    if (err) {
      console.log("Error connection to database", err);
    }
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  }
);
