import Database from "better-sqlite3";
const db = new Database("database.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    username TEXT,
    message TEXT,
    reaction TEXT
  )
`);
