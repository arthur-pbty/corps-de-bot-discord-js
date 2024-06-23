require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(process.env.DATABASE, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Connected to the database.");
});

db.run(`CREATE TABLE IF NOT EXISTS prefix (
  guildId TEXT NOT NULL,
  prefix TEXT NOT NULL DEFAULT '${process.env.PREFIX}',
  PRIMARY KEY (guildId)
)`);

module.exports = db;
