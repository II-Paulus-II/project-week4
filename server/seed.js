/* ----- Third Party Imports ----- */
import Database from "better-sqlite3";

/* ----- Create Database ----- */
const db = new Database("database.db");

/* ----- Project Week 4 - Treadstone Board ----- */
/* ----- Create Tables ----- */
db.exec(`
  CREATE TABLE IF NOT EXISTS treadstone_agent_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agentName TEXT,
    secretMessage TEXT,
    reaction TEXT,
    likes INTEGER
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS treadstone_supervisor_message (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  officer TEXT,
  message TEXT
  )
`);

/* ----- Seed Announcements and Messages ----- */ 
db.prepare(` INSERT INTO treadstone_agent_messages (agentName, secretMessage, reaction, likes) VALUES(?,?,?,?)`).run("Jason Bourne", "I told you to come alone, but I guess that was too hard. So try this - I'm gone.", "angry", 0);

db.prepare(`INSERT INTO treadstone_supervisor_message (officer, message) VALUES (?,?)`).run("Alexander Conklin","Now Jason, this only goes two ways. Either you come in and let us make this right, or we're going to have to keep going until we're satisfied.");