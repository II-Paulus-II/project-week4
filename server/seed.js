import Database from "better-sqlite3";
const db = new Database("database.db");

/* ----- Create Tables ----- */

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agentName TEXT,
    secretMessage TEXT,
    reaction TEXT,
    likes INTEGER
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS announcements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lineOne TEXT,
  lineTwo TEXT
  )
`);

/* ----- Seed Announcements and Messages ----- */ 

db.prepare(` INSERT INTO messages (agentName, secretMessage, reaction, likes) VALUES(?,?,?,?)`).run("Jason Bourne", "I told you to come alone, but I guess that was too hard. So try this - I'm gone.", "angry", 0);

db.prepare(`INSERT INTO announcements (lineOne, lineTwo) VALUES (?,?)`).run("Get Jason Bourne","I'm not having Jason Bourne destroy any more of this agency");

