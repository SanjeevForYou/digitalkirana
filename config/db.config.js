const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.HEROKU_POSTGRESQL_GOLD_URL,
  ssl: true,
});
await client.connect();
const res = await client.query("SELECT NOW()");
await client.end();
